import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  //   Get All Products - controller
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  //  Get Single Product - controller
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getProduct(prodId);
  }

  //   Add products - controller
  @Post()
  async addProducts(
    @Body() dto: { title: string; description: string; price: number },
  ) {
    return await this.productService.insertProduct(
      dto.title,
      dto.description,
      dto.price,
    );
  }

  // Update products - controller
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body() dto: { title: string; description: string; price: number },
  ) {
    return this.productService.updateProduct(
      prodId,
      dto.title,
      dto.description,
      dto.price,
    );
  }

  // Delete products - controller
  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productService.deleteProduct(prodId);
  }
}
