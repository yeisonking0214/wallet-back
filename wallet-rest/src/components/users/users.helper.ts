import { callSoapService } from "./../../helpers/soap.helper";
import { SOAP } from './../../config/constants'


class UsersHlp {

    async getBalance(data: any){
        let response = await  callSoapService(SOAP.URL, SOAP.GET_BALANCE, data)
        return response;
    }


    async createUser(data: object){
        let response = await  callSoapService(SOAP.URL, SOAP.CREATE_USER, data);
        return response;
    }

    async rechargeWallet(data: object){
        let response = await  callSoapService(SOAP.URL, SOAP.RECHARGE_WALLET, data);
        return response;
    }

    async paymentRequest(data: object){
        let response = await  callSoapService(SOAP.URL, SOAP.PAYMENT_REQUEST, data);
        return response;
    }


    async paymentValidation(data: object){
        let response = await  callSoapService(SOAP.URL, SOAP.PAYMENT_VALIDATION, data);
        return response;
    }

    

}



export default UsersHlp;