'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import Card from '../model/card-model';

const jsonParser=bodyParser.json();
const cardRouter=new Router();

cardRouter.post('/api/cards',jsonParser, (request,response,next)=>{
    return new Card(request.body).save()
    .then((card)=>{
        logger.log(logger.INFO,'post-responding with 200');
        response.json(card);
    })
    .catch(next);
});

cardRouter.put('api/cards/:id',jsonParser,(request,response,next)=>{
const options={runValidators:true,new:true};
    return Card.findByIdAndUpdate(request.params.id,request.body,options)
    .then((updatedCard)=>{
        if(!updatedCard){
            logger.log(logger.INFO, 'Incorrect PUT in cardRouter, responding with 404');
            return next(new HttpError(404,'card not found'));
        }
        logger.log(logger.INFO, 'PUT- responding with a 200');
        return response.json(updatedCard);
    })
    .catch(next);
});

export default cardRouter;