import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  // private productModel: ProductModel[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {} //injects the product mongoose model
  //   Get all products - service
  getAllProducts() {
    // return [...this.productModel]; we can do this to return a copy of the product model
    return { products: this.productModel }; // this returns a pointer to the productModel memory location
  }

  //   Get single product - service
  getProduct(productId: string) {
    const product = this.findProduct(productId)[0];

    return { product };
  }

  // Add products - service
  insertProduct(title: string, descirption: string, price: number) {
    const prodId = Date.now().toString();
    const newProduct = new this.productModel({ title, descirption, price });

    // this.productModel.push(newProduct);
    return { id: prodId };
  }

  //  Update products - service
  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, productIndex] = this.findProduct(productId);

    const updatedProduct = new ProductModel(
      productId,
      title ? title : product.title,
      description ? description : product.description,
      price ? price : product.price,
    );

    this.productModel[productIndex] = updatedProduct;

    return { id: productId, msg: 'Product Updated Successfully' };
  }

  // Delete products - service
  deleteProduct(productId: string) {
    const productIndex = this.findProduct(productId)[1];
    this.productModel.splice(productIndex, 1);

    return { msg: 'Product Deleted Successfully' };
  }

  // Private method to find products
  private findProduct(productId: string): [ProductModel, number] {
    const product = this.productModel.find((prod) => prod.id === productId);
    const productIndex = this.productModel.findIndex(
      (prod) => prod.id === productId,
    );

    if (!product || productIndex === -1) {
      throw new NotFoundException('Product not found');
    }

    return [product, productIndex];
  }
}
