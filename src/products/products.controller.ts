import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  //   Get All Products - controller
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  //  Get Single Product - controller
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getProduct(prodId);
  }

  //   Add products - controller
  @Post()
  addProducts(
    @Body() dto: { title: string; description: string; price: number },
  ) {
    return this.productService.insertProduct(
      dto.title,
      dto.description,
      dto.price,
    );
  }
}
