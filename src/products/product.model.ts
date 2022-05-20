import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}
// export class ProductModel {
//   //   id: string;
//   //   title: string;
//   //   descirption: string;
//   //   price: number;

//   //   constructor(id: string, title: string, description: string, price: number) {
//   //     this.id = id;
//   //     this.title = title;
//   //     this.descirption = description;
//   //     this.price = price;
//   //   }

//   constructor(
//     public id: string,
//     public title: string,
//     public description: string,
//     public price: number,
//   ) {}
// }
