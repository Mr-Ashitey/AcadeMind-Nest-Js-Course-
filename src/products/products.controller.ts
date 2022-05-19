import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

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

  //   Get Products - controller
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }
}
