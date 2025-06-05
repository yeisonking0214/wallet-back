
import escapeXml from 'xml-escape';
import mongoose from 'mongoose';
import { rspns , insertarDocumento, sendVerificationCodeEmail, ErrorRspns} from '../helpers/global.helper'
import { User } from '../models/User';
import { Wallet } from '../models/Wallet';
import { nanoid } from 'nanoid';




export const userService = {
	UserService: {
	  UserPort: {
		async GetBalance(args: any, callback: (err: any, result: any) => void) {
			try {
				let user:any = await User.findOne({
					identification: args.identification,
					phone: args.phone 
				}).populate('wallet');
				if(!user){
					callback(null, rspns({}, {cod_error: '404', message_error: `Usuario no encontrado`}));
				}
				callback(null, rspns({balance: user.wallet.value}));
			} catch (e) {
				callback(null, ErrorRspns(e, 'Error al consultar el saldo.'));
			}
			
		},
		async RechargeWallet(args: any, callback: (err: any, result: any) => void) {
			try {
				let user:any = await User.findOne({
					identification: args.identification,
					phone: args.phone 
				}).populate('wallet');
				if(!user){
					callback(null, rspns({}, {cod_error: '404', message_error: `Usuario no encontrado`}));
				}
				user.wallet.value += args.value;
				await user.wallet.save(); 
				callback(null, rspns({balance: user.wallet.value}));
			} catch (e) {
				callback(null, ErrorRspns(e, 'Error al hacer la recarga.'));
			}
		},
		async CreateUser(args: any, callback: (err: any, result: any) => void) {
			const session = await mongoose.startSession();
			session.startTransaction();

			try {
				let user:any = await insertarDocumento(User, args, session);
				await insertarDocumento(Wallet, {userId: user.payload._id, value: 0}, session);
				await session.commitTransaction();
    			session.endSession();
				callback(null, rspns({}, user.error));
			} catch (e:any) {
				callback(null, ErrorRspns(e, 'Se presento un error al registar el usuario.'));
			} 
		},
		async PaymentRequest(args: any, callback: (err: any, result: any) => void) {
			try {
				let user:any = await User.findOne({
					identification: args.identification,
					phone: args.phone 
				}).populate('wallet');
				if(!user){
					callback(null, rspns({}, {cod_error: '404', message_error: `Usuario no encontrado`}));
				}
				user.wallet.validationToken = {
					sessionId: nanoid(32),
					token: Math.floor(100000 + Math.random() * 900000).toString(),
					amount: args.value
				}
				await user.wallet.save();
				await sendVerificationCodeEmail(user.email, user.wallet.validationToken.token);
				callback(null, rspns({balace: user.wallet.value, sessionId: user.wallet.validationToken.sessionId}));
			} catch (e) {
				callback(null, ErrorRspns(e, 'Se ha genrarado un error en la solicitud de pago.'));
			}
		},
		async PaymentValidation(args: any, callback: (err: any, result: any) => void) {
			try {
				let user:any = await User.findOne({
					identification: args.identification
				}).populate('wallet');
				if(!user){
					callback(null, rspns({}, {cod_error: '404', message_error: `Usuario no encontrado`}));
				}
				let validation = user.wallet.validationToken;
				if(!validation){
					callback(null, rspns({}, {cod_error: '400', message_error: `No tiene tokens registrados.`}));
				} else {
					if(validation.sessionId == args.sessionId && validation.token == args.token){
						user.wallet.validationToken = null;
						user.wallet.value -= validation.amount;
						await user.wallet.save();
					} else {
						callback(null, rspns({}, {cod_error: '400', message_error: `Token Invalido.`}));
					}
				}
				callback(null, rspns({balance: user.wallet.value}));
			} catch (e) {
				callback(null, ErrorRspns(e, 'Se ha genrarado un error en la solicitud de pago.'));
			}
		},
	  },
	},
  };