import * as soap from 'soap'; 


export const callSoapService = async (wsdlUrl: string, method: string, payload: object, allowError = false): Promise<any> => {
    let result;
    try {
        const client = await soap.createClientAsync(wsdlUrl);
        if (!client[`${method}Async`]) {
            throw new Error(`El método '${method}' no existe en el servicio SOAP.`);
        }
        [result] = await client[`${method}Async`](payload);
    } catch (error:any) {
        let errorMsg = error?.message_error || error?.message || error?.stack || '';
        let isConnectionError = errorMsg.includes('AggregateError') || errorMsg.includes('ECONNREFUSED') || errorMsg.includes('ENOTFOUND');
        throw {
            success: false,
            message_error: isConnectionError
                ? 'No se pudo conectar con el servicio SOAP'
                : 'Error al consumir el servicio SOAP',
            cod_error: 500,
            data: {}
        };
    }
    if(!allowError && result?.success == false){
        throw result;
    }
    return result;
};