import { OrderEntity } from '../order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from '../../auth/user.entity';
import { OrderItemEntity } from '../orderItem.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async order(user: string, order: OrderEntity): Promise<OrderEntity> {
    const authUser = await this.userRepository.findOneBy({ username: user });
    order.userId = authUser.id;
    const newOrder = this.orderRepository.create(order);
    await this.orderRepository.save(newOrder);
    const newItems = order.items.map((item) => {
      item.orderId = newOrder.id;
      return this.orderItemRepository.create(item);
    });
    await this.orderItemRepository.save(newItems);
    return newOrder;
  }

  async getOrders(user: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      relations: ['user', 'items', 'items.product'],
      order: {
        createdAt: {
          direction: 'asc',
        },
      },
    });
    return orders.filter((order) => order.user?.username === user);
  }
}
