'use strict';

import faker from 'faker';
import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateCategoryMock, pRemoveCategoryMock } from './lib/category-mock';
import categoryModel from '../model/category-model';

const apiUrl=`http://localhost:${process.env.PORT}/api/categories`;

describe('api/categories',()=>{
    beforeAll(startServer);
    afterAll(stopServer);
    afterEach(pRemoveCategoryMock);

    describe ('POST api/categories',()=>{
        test('200',()=>{
            const mockCategory={
                title:faker.lorem.words(10),
                content:faker.lorem.worlds(50),
            };
            return superagent.post(apiUrl)
                .send(mockCategory)
                .then((response)=>{
                    expect(response.status).toEqual(200);
                    expect(response.body._id).toBeTruthy();
                    expect(response.body.title).toEqual(mockCategory.title);
                    expect(response.body.content).toEqual(mockCategory.content);
                });
        });

        test('409 due to duplicate title',()=>{
            return pCreateCategoryMock();
                .then((category)=>{
                    const mockCategory=>{
                        title:category.title,
                        content:category.content,
                    };
                    return superagent.post(apiUrl)
                        .send(mockCategory);
                })
                .then(Promise.reject)
                .catch((err)=>{
                    expect(err.status).toEqual(409);
                });
        });

        test('400 due to bad json',()=>{
            return superagent.post(apiUrl)
                .send('{')
                .then(Promise.reject)
                .catch((err)=>{
                    expect(err.status).toEqual(400);
                });
        });
    });
    describe('GET /api/categories',()=>{
        test('200',()=>{
            let tempCategory=null;
            return pCreateCategoryMock()
                .then((category)=>{
                    tempCategory=category;
                    return superagent.get(`${apiUrl}/${category._id}`)
                    .then((response)=>{
                        expect(response.status).toEqual(200);
                        expect(response.body._id).toEqual(tempCategory._id.toString());
                    });
                });
        });
    });
    describe('DELETE /api/categories',()=>{
        test('204',()=>{
            return pCreateCategoryMock()
            .then((category)=>{
                return superagent.delete(`${apiUrl}/${category._id}`);
            })
            .then((response)=>{
                expect(response.status).toEqual(204);
            });
        });
    });
});