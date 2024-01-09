import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProductEntity } from '../product.entity';
import { ProductsService } from '../service/product.service';

@Controller('api/v1/product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async GetAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async Create(
    @Request() req,
    @Body() product: ProductEntity,
  ): Promise<ProductEntity> {
    return await this.productsService.create(product, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async GetOne(@Param() id: string): Promise<ProductEntity> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: ProductEntity,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
