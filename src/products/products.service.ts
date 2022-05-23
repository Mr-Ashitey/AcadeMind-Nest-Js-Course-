import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async getAllProducts() {
    const products = await this.productModel.find();
    return { products: products }; // this returns a pointer to the productModel memory location
  }

  //   Get single product - service
  async getProduct(productId: string) {
    const product = await this.findProduct(productId);

    return { product };
  }

  // Add products - service
  async insertProduct(title: string, description: string, price: number) {
    // const prodId = Date.now().toString();
    const newProduct = new this.productModel({ title, description, price });

    // this.productModel.push(newProduct);
    const result = await newProduct.save();
    return { id: result.id, msg: 'Product Added Successfully' };
  }

  //  Update products - service
  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    try {
      if (!title || !description || !price) {
        throw new NotFoundException('All fields are required');
      }
      const updatedProduct = { title, description, price };

      const result = await this.productModel.findOneAndUpdate(
        { _id: productId },
        updatedProduct,
        { new: true },
        // (err, doc) => {},
      );

      return { id: result.id, msg: 'Product Updated Successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Delete products - service
  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find the product');
    }

    return { msg: 'Product Deleted Successfully' };
  }

  // Private method to find products
  private async findProduct(productId: string): Promise<Product> {
    // find product by id
    try {
      const product = await this.productModel.findById(productId).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('Product not found');
    }
  }
}
