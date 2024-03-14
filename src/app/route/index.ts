import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { wishlistRoute } from '../modules/wishList/wishList.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/wishlist',
    route: wishlistRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
