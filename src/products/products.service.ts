import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';

@Injectable()
export class ProductsService {
  private productModel: ProductModel[] = [];

  // Add products - service
  insertProduct(title: string, descirption: string, price: number) {
    const prodId = Date.now().toString();
    const newProduct = new ProductModel(prodId, title, descirption, price);

    this.productModel.push(newProduct);
    return { id: prodId };
  }

  //   Get products - service
  getProducts() {
    // return [...this.productModel]; we can do this to return a copy of the product model
    return { products: this.productModel }; // this returns a pointer to the productModel memory location
  }
}
