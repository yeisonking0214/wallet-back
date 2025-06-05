import UsersHlp from "./users.helper";
import { z } from 'zod';
import { validateZod } from "./../../helpers/global.helper";



export class UsersCtr {
    hlp: UsersHlp;
    url = 'http://localhost:8000/wsdl?wsdl';

    constructor(){
        this.hlp = new UsersHlp();
    }


    async getBalance(req: any, res: any) {
        let data = req.query;
        validateZod(data, z.object({
            identification: z.string().min(7),
            phone: z.string().min(10),
        }));
        let response = await this.hlp.getBalance(data);
        res.send(response);
    }


    async createUSer(req: any, res: any) {
        let data = req.body;
        validateZod(data, z.object({
            identification: z.string().min(7),
            fullName: z.string().min(5),
            email: z.string().email(),
            phone: z.string().min(10),
        }));
        let response = await this.hlp.createUser(data);
        res.send(response);
    }

    async rechargeWallet(req: any, res: any) {
        let data = req.body;
        validateZod(data, z.object({
            identification: z.string().min(7),
            phone: z.string().min(10),
            value: z.number().min(0),
        }));
        let response = await this.hlp.rechargeWallet(data);
        res.send(response);
    }


    async paymentRequest(req: any, res: any) {
        let data = req.body;
        validateZod(data, z.object({
            identification: z.string().min(7),
            value: z.number().min(0),
        }));
        let response = await this.hlp.paymentRequest(data);
        res.send(response);
    }

    async paymentValidation(req: any, res: any) {
        let data = req.body;
        validateZod(data, z.object({
            identification: z.string().min(7),
            sessionId: z.string(),
            token: z.string(),
        }));
        let response = await this.hlp.paymentValidation(data);
        res.send(response);
    }

    
}