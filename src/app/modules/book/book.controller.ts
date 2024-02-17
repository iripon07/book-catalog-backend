import { Request, Response } from 'express';
import { BookService } from './book.service';

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const result = await BookService.createBook(book);
    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create book',
    });
  }
};

export const BookController = {
  createBook,
};
