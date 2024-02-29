import express from 'express';
import { BookController } from './book.controller';
const router = express.Router();

router.post('/create-book', BookController.createBook);
router.get('/all-books', BookController.getAllBooks);
router.get('/:id', BookController.getSingleBook);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
