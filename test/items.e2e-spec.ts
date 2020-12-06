import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from "@nestjs/common";
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from "path";

import { ItemsModule } from '../src/items/items.module';
import { Item } from '../src/items/interfaces/item.interface';

describe('ItemsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ItemsModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs_products'),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), "graphql/schema.gql"),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const item: Item = {
    title: 'Great item',
    price: 10,
    description: 'Description of this great item',
  };

  let id: string = '';

  const updatedItem: Item = {
    title: 'Great updated item',
    price: 20,
    description: 'Updated description of this great item',
  };

  const createitemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createItemQuery = `
  mutation {
    createItem(input: ${createitemObject}) {
      title
      price
      description
      id
    }
  }`;

  it('createItem', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set("Accept", "application/json")
      .send({
        operationName: null,
        query: createItemQuery,
      })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        const data = body.data.createItem;

        id = data.id;

        expect(data.title).toBe(item.title);
        expect(data.description).toBe(item.description);
        expect(data.price).toBe(item.price);
      });
  });

  it('getItems', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: `{item(id: "${id}"){title, price, description, id}}`,
      })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        const {item: itemResult} = body.data;

        expect(itemResult.title).toBe(item.title);
        expect(itemResult.description).toBe(item.description);
        expect(itemResult.price).toBe(item.price);
      })
  });

  const updateItemObject = JSON.stringify(updatedItem).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updateItem', () => {
    const updateItemQuery = `
    mutation {
      updateItem(id: "${id}", input: ${updateItemObject}) {
        title
        price
        description
        id
      }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .set("Accept", "application/json")
      .send({
        operationName: null,
        query: updateItemQuery,
      })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        const data = body.data.updateItem;

        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.price).toBe(updatedItem.price);
      });
  });

  it('deleteItem', () => {
    const deleteItemQuery = `
      mutation {
        deleteItem(id: "${id}") {
          title
          price
          description
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteItemQuery,
      })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        const data = body.data.deleteItem;

        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.price).toBe(updatedItem.price);
      });
  });
});