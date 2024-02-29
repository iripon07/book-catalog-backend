import { Model, Types } from 'mongoose';
export type Genre =
  | 'Fiction'
  | 'Non-fiction'
  | 'Sci-fi'
  | 'Mystery'
  | 'Thriller'
  | "Children's book"
  | 'Religious'
  | 'History'
  | 'Biography';

export const bookGenre: Genre[] = [
  'Fiction',
  'Non-fiction',
  'Sci-fi',
  'Mystery',
  'Thriller',
  "Children's book",
  'Religious',
  'History',
  'Biography',
];

export type IBookReview = {
  rating: string;
  comment: string;
};

export type IBook = {
  title: string;
  author: string;
  publicationDate: string;
  createdBy: Types.ObjectId;
  genre: Genre;
  description: string;
  coverImage: string;
  reviews: IBookReview[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
  title?: string;
  author?: string;
};
