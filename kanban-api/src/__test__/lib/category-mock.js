'use strict';

import faker from 'faker';
import Category from '../../model/category-model';

const pCreateCategoryMock=()=>{
    return new Category({
        title: faker.lorem.words(5),
        content: faker.lorem.words(30),
    }).save();
};

const pRemoveCategoryMock=()=>Category.remove({});

export { pCreateCategoryMock,pRemoveCategoryMock };