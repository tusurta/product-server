import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../auth/user.entity';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => ProductEntity, (order) => order.id)
  @JoinColumn()
  item: ProductEntity;

  @ManyToOne((type) => Users, (user) => user.id)
  @JoinColumn()
  user: Users;
}
