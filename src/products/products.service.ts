import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from './product.model';

@Injectable()
export class ProductsService {
  private productModel: ProductModel[] = [];

  //   Get all products - service
  getAllProducts() {
    // return [...this.productModel]; we can do this to return a copy of the product model
    return { products: this.productModel }; // this returns a pointer to the productModel memory location
  }

  //   Get single product - service
  getProduct(productId: string) {
    const product = this.productModel.find((prod) => prod.id === productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { product };
  }

  // Add products - service
  insertProduct(title: string, descirption: string, price: number) {
    const prodId = Date.now().toString();
    const newProduct = new ProductModel(prodId, title, descirption, price);

    this.productModel.push(newProduct);
    return { id: prodId };
  }
}
