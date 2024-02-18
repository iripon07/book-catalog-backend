import { Model } from 'mongoose';
export type IBook = {
  title: string;
  author: string;
  publishingDate: string;
  genre: string;
  description: string;
  coverImage: string;
  price: number;
  availableQuantity: number;
};

export type BookModel = Model<IBook>;
