import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
export type IBook = {
  title: string;
  author: string;
  publishingDate: Date;
  createdBy: Types.ObjectId | IUser;
  genre: string;
  description: string;
  coverImage: string;
  ratings: number[];
  reviews: string[];
  price: number;
  availableQuantity: number;
  addedBy?: Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
  title?: string;
  author?: string;
};
