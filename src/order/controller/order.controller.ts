import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderEntity } from '../order.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async order(@Request() req, @Body() order: OrderEntity): Promise<any> {
    return this.orderService.order(req.user.username, order);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrders(@Request() req): Promise<OrderEntity[]> {
    return await this.orderService.getOrders(req.user.username);
  }
}
