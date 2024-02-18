import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  console.log(book, 'Book Data');
  const result = await Book.create(book);
  if (!result) {
    throw new Error(`Book can;t create`);
  }
  return result;
};

export const BookService = {
  createBook,
};
