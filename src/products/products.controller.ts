import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProducts(
    @Body() dto: { title: string; description: string; price: number },
  ) {
    // console.log(dto);
    return this.productService.insertProduct(
      dto.title,
      dto.description,
      dto.price,
    );
  }
}
