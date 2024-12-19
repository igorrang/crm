export enum ECustomError{
    UNDEFIED_ERROR= "UNDEFINED_ERROR",
    TABLE_ALTER_DATA="TABLE_ALTER_DATA",
    CONNECT_TO_MONGO_EREROR ="CONNECT_TO_MONGO_ERROR",
    DATABASE_ERROR="DATABASE_ERROR",
    USER_ERROR="USER_ERROR"
}


export enum DATABASE_ERRORS{
    DUPLICATED_KEY = 11000
}


export interface DatabaseServerError extends Error {
    code: number;
    keyValue?:  { [key:string]:any};
    keyPattern?:  { [key:string]:any};
}


export class CustomError extends Error{
    constructor(errorType: ECustomError, message?: string, cause?:unknown){
        super(message,{cause:cause});
        this.errorType = errorType
    }
    errorType: ECustomError = ECustomError.UNDEFIED_ERROR
}