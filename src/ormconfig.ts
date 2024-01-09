export const config = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'rootroot',
  database: 'backend',
  entities: ['src/**/*.entity.ts', 'build/**/*.entity.js'],
  migrations: ['migrations/**/*.ts'],
  synchronize: true,
};
