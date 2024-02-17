import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const book = payload;
  const createdBook = await Book.create(book);
  console.log(createdBook, 'created Book');
  return createdBook;
};

export const BookService = {
  createBook,
};
