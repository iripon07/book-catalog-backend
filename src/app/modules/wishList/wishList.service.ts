import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Book } from '../book/book.model';
import { User } from '../user/user.model';
import { WishList } from './wishlist.model';

const addToWishList = async (bookId: string, userId: string) => {
  const isBookExist = await Book.findOne({ _id: bookId });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Book does not exist!!!`);
  }
  const isUserExist = await User.findOne({ _id: userId });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User does not exist!!!`);
  }
  const result = await WishList.create({ book: bookId, user: userId });
  return result;
};

export const WishListService = {
  addToWishList,
};
