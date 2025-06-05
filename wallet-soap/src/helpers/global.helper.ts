import { resolve } from "path";
import { Rspns, ErrorRspns } from '../interfaces/interfaces';
import mongoose from 'mongoose';
import sgMail from '@sendgrid/mail';

export const rspns = (data: object|Array<any>, error: ErrorRspns|null = null): Rspns => {
    const response: Rspns = error === null
        ? {
            success: true,
            cod_error: '00',
            message_error: '',
            data,
        } : {
            success: false,
            ...error,
            data,
        };

    return response;
}

export async function insertarDocumento(Modelo: any, datos: object, session: mongoose.ClientSession | null = null) {
    try {
        const nuevoDocumento = new Modelo(datos);
        let documento = await nuevoDocumento.save({ session });
        console.log('Documento insertado con éxito:', documento);
        return {success: true, payload: documento};
    } catch (err: any) {
        console.error(err);
        if (session && session.inTransaction()) {
            await session.abortTransaction();
            await session.endSession();
        }
        if (err.code === 11000) {
            const duplicated = Object.keys(err.keyValue)[0];
            throw {success: false, payload: {}, error: {cod_error: '400', message_error: `Ya hay un usuario registrado con el dato: ${err.keyValue[duplicated]}`}};
        } 
        throw {success: false, payload: {}, error: {cod_error: '400', message_error: `Se presento un error al momento de registrar los datos`}};
    }
}

export async function sendVerificationCodeEmail(to: string, code: string) {
    try {
        await sgMail.send({
                to: to,
                from: 'yeison.mancilla.redes@gmail.com',  // Debe estar verificado en SendGrid
                subject: '[WALLET] Verificacion Pago',
                html:  `<div style="font-style:italic">
                            <h1>Tienes una nueva <span class="il">solictud de pago</span>:</h1>
                            <h4 style="display:inline">Su nuevo <span class="il">codigo</span> </h4><h2 style="display:inline;color:#f06716"> ${code} </h2>
                        </div></div>`,
        });
    } catch (err: any) {
        throw {success: false, payload: {}, error: {cod_error: '400', message_error: `Se presento un error al enviar el correo`}};
    }

}

export function ErrorRspns(error: any, msg = '') {
    console.log('ErrorRspns:::::::::', error)
    if('payload' in error)
        return rspns(error.payload, error.error);
    else
        return rspns({}, {cod_error: '500', message_error: msg || `Se presento un error`});
}



// export function generateExpiresAt(): Date {
//     const now = new Date();
//     now.setMinutes(now.getMinutes() + 30);
//     return now;
// }

class GlobalHlp {
     
}
export default GlobalHlp;