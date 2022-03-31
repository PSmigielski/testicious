interface IMailContent {
    from: string,
    to: string | string[],
    subject: string,
    html: string
}

export default IMailContent;