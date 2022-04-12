import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import { NextFunction, Request, Response } from "express";
import addFormats from "ajv-formats";
import fs from "fs";
import IUser from "../types/IUser";
import ApiErrorException from "../exceptions/ApiErrorException";
import validation from "ajv/dist/vocabularies/validation";

const schemaValidator = (pathToSchema: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv();
        addFormats(ajv);
        const schema: JSONSchemaType<IUser> = JSON.parse(fs.readFileSync(`${__dirname}${pathToSchema}`).toString());
        const validate: ValidateFunction = ajv.compile(schema);
        if (!validate(req.body)) {
            if (validate.errors !== undefined && validate.errors !== null) {
                console.log(validate.errors);
                switch (validate.errors[0].keyword) {
                    case "minProperties":
                        throw new ApiErrorException(`${validate.errors[0].params.limit} param/s required`, 400);
                        break;
                    case "pattern":
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} does not match pattern`,
                            400,
                        );
                        break;
                    case "type":
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} has invalid type`,
                            400,
                        );
                        break;
                    case "required":
                        throw new ApiErrorException(`${validate.errors[0].params.missingProperty} required`, 400);
                        break;
                    case "additionalProperties":
                        throw new ApiErrorException(`no additional properties allowed`, 400);
                        break;
                    case "maxLength":
                        throw new ApiErrorException(`${validate.errors[0].instancePath.substring(1)} is too long`, 400);
                        break;
                    case "minLength":
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} is too short`,
                            400,
                        );
                        break;
                    case "format":
                        throw new ApiErrorException(`must match ${validate.errors[0].params.format} format`, 400);
                        break;
                    case "enum":
                        let acceptedValues = "";
                        validate.errors[0].params.allowedValues.forEach((el: string, index: number) => {
                            if (index != 0) {
                                acceptedValues += `, ${el}`;
                            } else {
                                acceptedValues += `${el}`;
                            }
                        });
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} may have values ${acceptedValues}`,
                            400,
                        );
                        break;
                    case "minItems":
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} requires at least ${
                                validate.errors[0].params.limit
                            } item/s`,
                            400,
                        );
                        break;
                    case "minimum":
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} must be greater or equal than ${
                                validate.errors[0].params.limit
                            }`,
                            400,
                        );
                        break;
                    case "maximum":
                        throw new ApiErrorException(
                            `${validate.errors[0].instancePath.substring(1)} must be lower or equal than ${
                                validate.errors[0].params.limit
                            }`,
                            400,
                        );
                        break;
                    default:
                        throw new ApiErrorException(`Something went wrong`, 500);
                        break;
                }
            }
        }
        next();
    };
};

export default schemaValidator;
