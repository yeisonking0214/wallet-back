export interface Rspns {
    success: boolean;
    cod_error: string;
    message_error: string;
    data: object|Array<any>;
}

export interface ErrorRspns {
    cod_error: string;
    message_error: string;
    
}