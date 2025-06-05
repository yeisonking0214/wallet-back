import { ZodSchema } from "zod";


export const validateZod = (data: object, schema: ZodSchema) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw {
            success: false,
            message_error: 'Campos incompletos.',
            cod_error: 400,
            data: result.error.errors
        };
    }
}   

class GlobalHlp {
     
}
export default GlobalHlp;