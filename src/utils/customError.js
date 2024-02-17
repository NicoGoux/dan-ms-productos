class CustomError extends Error {
    constructor(type, code, message) {
        super(message);
        this.type = type;
        this.code = code;
    }
}

export { CustomError };
