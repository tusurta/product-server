import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from '../cart/service/cart.service';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { Users } from '../auth/user.entity';
import { OrderItemEntity } from './orderItem.entity';
import { AuthService } from '../auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [OrderService, AuthService, JwtService],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ProductEntity,
      Users,
      OrderItemEntity,
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
