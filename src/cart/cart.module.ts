import { Module } from '@nestjs/common';
import { ProductsService } from '../product/service/product.service';
import { CartService } from './service/cart.service';
import { CartEntity } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/user.entity';
import { ProductEntity } from '../product/product.entity';
import { CartController } from './controller/cart.controller';

@Module({
  providers: [CartService, ProductsService],
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, Users])],
  controllers: [CartController],
})
export class CartModule {}
