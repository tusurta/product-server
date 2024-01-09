import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductsService } from './service/product.service';
import { ProductsController } from './controller/product.controller';

@Module({
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
})
export class ProductModule {}
