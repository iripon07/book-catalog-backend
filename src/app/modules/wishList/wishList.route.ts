import express from 'express';
import { WishListController } from './wishList.controller';

const router = express.Router();

router.post(`/add`, WishListController.addToWishList);

export const wishlistRoute = router;
