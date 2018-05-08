'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Category from './category-model';

const cardSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    content:{
        type: String,
    },
    createdOn:{
        type: Date,
        default: ()=> new Date(),
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'category',
    },
});

function cardPreHook(done){
    return Category.findById(this.category)
    .then((categoryFound)=>{
        if(!categoryFound){
            throw new HttpError(404,'category not found');
        }
        categoryFound.cards.push(this._id);
        return categoryFound.save();
    })
    .then(()=>done())
    .catch(done);
}

const cardPostHook=(document,done)=>{
    return Category.findById(document.category)
        .then((categoryFound)=>{
            if(!categoryFound){
                throw new HttpError(500,'category not found');
            }
            categoryFound.cards=categoryFound.cards.filter((card)=>{
                return card._id.toString()!== document._id.toString()
            });
        })
        .then(()=>done())
        .catch(done);
};

cardSchema.pre('save',cardPreHook);
cardSchema.post('remove',cardPostHook);

export default mongoose.model('card',cardSchema);