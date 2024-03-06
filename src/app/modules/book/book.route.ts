import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/create-book', auth(), BookController.createBook);
router.get('/all-books', BookController.getAllBooks);
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);
router.patch(
  '/review/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
