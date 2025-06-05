import tcWrapper from '../helpers/error-handler';
import { Request, Response, Router } from 'express';
import { UsersCtr } from '../components/users/users.controller';

const router = Router();
const controller = new UsersCtr();
const wrap:object = {ctrl: controller};


router.route('/balance')
    .get((req:Request, res:Response) => tcWrapper(controller.getBalance, wrap, req, res)());

router.route('/')
    .post((req:Request, res:Response) => tcWrapper(controller.createUSer, wrap, req, res)());


router.route('/recharge-wallet')
    .patch((req:Request, res:Response) => tcWrapper(controller.rechargeWallet, wrap, req, res)());

router.route('/payment-request')
    .post((req:Request, res:Response) => tcWrapper(controller.paymentRequest, wrap, req, res)());

router.route('/payment-validation')
    .post((req:Request, res:Response) => tcWrapper(controller.paymentValidation, wrap, req, res)());
    

export default router;