const tcWrapper = function(f:any, wrap:any,req:any, res: any) {
    return async function() {
        try {
            await f.apply(wrap.ctrl, [req, res]);
        } catch(err:any) {
            console.log('err ----------------------------------------------', err.msg);
            console.log(err);
            console.log('err ----------------------------------------------', !err.msg);
            let status = err?.cod_error ? err.cod_error*1 : (req.status ? req.status : 500);
            if(err && 'message_error' in err) 
                res.status(status).send(err);
            else {
                res.status(status).send({
                    success: false,
                    message_error: 'Se ha presentado un error.',
                    cod_error: status,
                    data: {}
                })
            }
            
        }
    }
}
export default tcWrapper;

