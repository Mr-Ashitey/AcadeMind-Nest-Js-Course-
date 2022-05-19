import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';

@Injectable()
export class ProductsService {
  productModel: ProductModel[] = [];

  // Add products Service
  insertProduct(title: string, descirption: string, price: number) {
    const prodId = Date.now().toString();
    const newProduct = new ProductModel(prodId, title, descirption, price);

    this.productModel.push(newProduct);
    return { id: prodId };
  }
}
