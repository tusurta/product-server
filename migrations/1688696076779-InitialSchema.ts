import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1688696076779 implements MigrationInterface {
    name = 'InitialSchema1688696076779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`role\` varchar(255) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updtedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`product_entity\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`price\` int NOT NULL,
                \`quantity\` int NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updtedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`order_item_entity\` (
                \`id\` varchar(36) NOT NULL,
                \`orderId\` varchar(255) NOT NULL,
                \`productId\` varchar(255) NOT NULL,
                \`quantity\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`order_entity\` (
                \`id\` varchar(36) NOT NULL,
                \`userId\` int NOT NULL,
                \`subTotal\` int NOT NULL,
                \`pending\` tinyint NOT NULL DEFAULT 0,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updtedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`cart_entity\` (
                \`id\` varchar(36) NOT NULL,
                \`total\` int NOT NULL,
                \`quantity\` int NOT NULL,
                \`itemId\` varchar(36) NULL,
                \`userId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item_entity\`
            ADD CONSTRAINT \`FK_cd7ee8cfd1250200aa78d806f8d\` FOREIGN KEY (\`orderId\`) REFERENCES \`order_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item_entity\`
            ADD CONSTRAINT \`FK_9ab23dbbebb09189f395316b609\` FOREIGN KEY (\`productId\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_entity\`
            ADD CONSTRAINT \`FK_c8ab590f1e10afcf1637e71a71e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`cart_entity\`
            ADD CONSTRAINT \`FK_75b7cfe1914e491b926ace6cf3e\` FOREIGN KEY (\`itemId\`) REFERENCES \`product_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`cart_entity\`
            ADD CONSTRAINT \`FK_8edda4b36869b45de9624747e8a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`cart_entity\` DROP FOREIGN KEY \`FK_8edda4b36869b45de9624747e8a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`cart_entity\` DROP FOREIGN KEY \`FK_75b7cfe1914e491b926ace6cf3e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_entity\` DROP FOREIGN KEY \`FK_c8ab590f1e10afcf1637e71a71e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item_entity\` DROP FOREIGN KEY \`FK_9ab23dbbebb09189f395316b609\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`order_item_entity\` DROP FOREIGN KEY \`FK_cd7ee8cfd1250200aa78d806f8d\`
        `);
        await queryRunner.query(`
            DROP TABLE \`cart_entity\`
        `);
        await queryRunner.query(`
            DROP TABLE \`order_entity\`
        `);
        await queryRunner.query(`
            DROP TABLE \`order_item_entity\`
        `);
        await queryRunner.query(`
            DROP TABLE \`product_entity\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    }

}
