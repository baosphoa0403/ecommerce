import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21719250943784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.query("select 11;")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
