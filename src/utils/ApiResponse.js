class ApiResponse {
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400
    }
}

export { ApiResponse}


// https://stackoverflow.com/questions/65404733/custom-api-responses