import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1719246783954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.manager.query("select 10;")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
