import {
  Entity,
  OneToMany,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../auth/user.entity';
import { OrderItemEntity } from './orderItem.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @OneToMany((type) => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];

  @Column()
  userId: number;

  @ManyToOne((type) => Users)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;
}
