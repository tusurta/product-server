# frontend-template 用のバックエンドアプリ

## 環境設定

- `$ docker compose up -d`で docker コンテナで mysql を立ち上げる
- `$ yarn install`
- `$ yarn run typeorm migration:run -- --dataSource src/data-source.ts` -> mysql マイグレーション

## 起動

`$ yarn start`  
 -> サーバー起動
