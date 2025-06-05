import dotenv from 'dotenv';
dotenv.config();

export const SOAP = {
    URL: `${process.env.SOAP_BASE_URL}/wsdl?wsdl`,
    GET_BALANCE: 'GetBalance',
    CREATE_USER: 'CreateUser',
    RECHARGE_WALLET: 'RechargeWallet',
    PAYMENT_REQUEST: 'PaymentRequest',
    PAYMENT_VALIDATION: 'PaymentValidation',
    
};