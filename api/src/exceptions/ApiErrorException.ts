class ApiErrorException extends Error {
    private code: number;
    constructor(message: string, code?: number) {
        super(message);
        this.code = code && code || 500;
    }
    public getCode() {
        return this.code;
    }
}

export default ApiErrorException;