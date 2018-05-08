'use strict';

import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    content:{
        type: String,
    },
    timestamp:{
        type: Date,
        default: ()=>new Date(),
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,ref:'card',
        },
    ],
},{
usePushEach: true,
});
export default mongoose.model('category',categorySchema);