import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne((type) => OrderEntity, (item) => item.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column()
  productId: string;

  @ManyToOne(() => ProductEntity, (item) => item.id)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column()
  quantity: number;
}
