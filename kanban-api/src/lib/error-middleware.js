'use strict';

import logger from './logger';

export default(error,request, response, next)=>{
    logger.log(logger.ERROR,'__ERROR_MIDDLEWARE__');
    logger.log(logger.ERROR,error);
    if(error.status){
        logger.log(logger.INFO,`ERROR MIDDLEWARE: Responding with a ${error.status} code and message ${error.message}`);
        return response.sendStatus(error.status);
    }
    
    const errorMessage=error.message.toLowerCase();

    if(errorMessage.includes('objectid failed')){
        logger.log(logger.INFO,'ERROR in MIDDLEWARE: 404');
        return response.sendStatus(404);
    }
    if(errorMessages.includes('validation failed')){
        logger.log(logger.INFO, 'ERROR in MIDDLEWARE: 400.');
        return response.sendStatus(400);
    }
    if(errorMessage.includes('duplicate key')){
        logger.log(logger.INFO, 'ERROR in MIDDLEWARE: 409');
        return response.sendStatus(409);
    }
    if(errorMessage.includes('unauthorized')){
        logger.log(logger.INFO,'Responding with a 401 code');
        return response.sendStatus(401);
    }
    logger.log(logger.ERROR,'responding with 500 error code');
    logger.log(logger.ERROR,error);
    return response.sendStatus(500);
}