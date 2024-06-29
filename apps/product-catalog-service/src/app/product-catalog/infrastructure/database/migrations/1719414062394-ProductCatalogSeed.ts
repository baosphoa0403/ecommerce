import { MigrationInterface, QueryRunner } from "typeorm";
import { CatalogEntity } from '../../../domain/catalog/entities/catalog.entity';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { ProductEntity } from '../../../domain/product/entities/product.entity';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

interface ICategory {
  name: string,
  level: number
  parentId: string
}

export class ProductCatalogSeed1719414062394 implements MigrationInterface {
    private buildCategory = (categories: Partial<ICategory>[]) => {
      return categories.map((item)=> {
        return {
          name: item.name,
          level: item.level,
          parentId: item.parentId ?? null
        }
      })
    }

    private buildProduct = (catalogId: string):Partial<ProductEntity>[] => {
      const products: Partial<ProductEntity>[] = []
      for (let i = 0; i < 100; i++) {
        products.push({name: faker.commerce.productName(),catalogId:catalogId, description: faker.commerce.productDescription(),price: parseInt(faker.commerce.price())})
      }
      return products
    }


    public async up(queryRunner: QueryRunner): Promise<void> {
      const categoryRoot: Array<Partial<ICategory>> = [{name: "Điện Gia Dụng", level: 1}, {name: "Xe Cộ", level: 1}, {name: "Mẹ & Bé", level: 1}, {name: "Khoẻ Đẹp", level: 1}]
      let categorySub: Array<Partial<ICategory>> = [{name: "Nồi Cơm Điện", level: 2}, {name: "Xe Máy", level: 2}, {name: "Tả", level: 2}, {name: "Mặt Nạ", level: 2}];

      const resultCatalogRoot = await queryRunner.manager.insert(CatalogEntity, this.buildCategory(categoryRoot));
      const promiseCategory: Promise<InsertResult>[] = [];
      for (let i = 0; i < categorySub.length; i++) {
        const item = categorySub[i];
        item.parentId = resultCatalogRoot.identifiers[i]["id"];
      }
      promiseCategory.push(queryRunner.manager.insert(CatalogEntity, this.buildCategory(categorySub)));

      const resultCategory = await Promise.allSettled(promiseCategory)
      const promiseProduct: Promise<InsertResult>[] = [];
      for (const item of resultCategory) {
        if ( item.status === "rejected") {
          throw new BadRequestException("error")
        }
        for (const {id} of item.value.identifiers) {
          promiseProduct.push(queryRunner.manager.insert(ProductEntity, this.buildProduct(id)))
        }

      }

      const resultProduct = await Promise.allSettled(promiseProduct)
      console.log(resultProduct);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
