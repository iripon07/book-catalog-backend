import { Model, Types } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  publishingDate: Date;
  genre: string;
  description: string;
  coverImage: string;
  ratings: number[];
  reviews: string[];
  price: number;
  availableQuantity: number;
  addedBy: Types.ObjectId;
};

export type BookModel = Model<IBook>;
