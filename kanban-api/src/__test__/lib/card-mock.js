'use strict';

import faker from 'faker';
import Card from '../../card-model';
import * as categoryMock from './category-mock';

const pCreateCardMock=()=>{
    const resultMock={};
    return categoryMock.pCreateCategoryMock()
    .then((createdCategory)=>{
        resultMock.category=createdCategory;

        return new Card({
            title:faker.lorem.words(5),
            content: faker.lorem.words(10),
            category:createdCategory._id,
        }).save();
    })
    .then((newCard)=>{
        resultMock.card=newCard;
        return resultMock;
    });
};

const pRemoveCardMock=()=>Promise.all([
    Card.remove({}),
    categoryMock.pRemoveCardMock(),
]);

export { pCreateCardMock, pRemoveCardMock};