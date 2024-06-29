import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { GenderEnum } from '@ecommerce/libs';
import { UserEntity } from '../../../domain/user/entities/user.entity';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';

interface User {firstName: string, lastName: string, dateOfBirth: Date, gender: GenderEnum, nationalId: string, phone: string, password: string, email: string}

export class User1719682568016 implements MigrationInterface {

    private buildInsertUser(gender: GenderEnum) {
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: new Date(),
        gender: gender,
        nationalId: faker.person.bio(),
        phone: faker.phone.number(),
        password: "123",
        email: "minhthu@gmail.com"
      }
    }
    public async up(queryRunner: QueryRunner): Promise<void> {
      const promiseUser: User[] = [];
      for (let i = 0; i < 100; i++) {
          const gender = i <= 50 ? GenderEnum.MALE : GenderEnum.FEMALE
          promiseUser.push(this.buildInsertUser(gender))
      }

     const result = await queryRunner.manager.insert(UserEntity, promiseUser)
      console.log(result);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
