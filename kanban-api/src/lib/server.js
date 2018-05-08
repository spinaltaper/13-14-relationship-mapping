'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from 'logger';
import categoryRoutes from '../route/category-router';
import cardRoutes from '../route/card-router';
import errorMiddleware from './error-middleware';

const app=express();
let server=null;

app.use(categoryRoutes);
app.use(cardRoutes);

app.all('*',(request,Response)=>{
    logger.log
});

app.use(errorMiddleware);

const startServer=()=>{
    return mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        server=app.listen(process.env.PORT,()=>{
            logger.log(logger.INFO,`Server is listening on port ${process.env.PORT}`);
        });
    }).catch((err)=>{
    logger.log(logger.ERROR,`Something went wrong! ${JSON.stringify(err)}`);
})
};
const stopServer= () =>{
    return mongoose.disconnect()
    .then(()=>{
        server.close(()=>{
            logger.log(logger.INFO,'server is off');
        });
    })
    .catch((err)=>{
        logger.log(logger.ERROR,`Something went wrong! ${JSON.stringify(err)}`);
    })
};

export { startServer,stopServer};