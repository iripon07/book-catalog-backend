import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return result;
};

const getAllBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find();
  return result;
};

const getSingleBook = async (payload: string): Promise<IBook | null> => {
  const _id = payload;
  const result = await Book.findById(_id);
  return result;
};

const deleteBook = async (payload: string): Promise<IBook | null> => {
  const _id = payload;
  const result = await Book.findByIdAndDelete(_id);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
};
