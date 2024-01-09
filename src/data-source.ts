import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3307,
  username: 'root',
  password: 'rootroot',
  database: 'backend',
  entities: ['build/src/**/*.entity.js', 'src/**/*.entity.ts'],
  migrations: ['build/migrations/**/*.{js,ts}', 'src/migrations/*.ts'],
});
(async function () {
  await AppDataSource.initialize();
})();
