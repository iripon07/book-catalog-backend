import httpStatus from 'http-status';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import { WishListService } from './wishList.service';

const addToWishList = catchAsync(async (req, res) => {
  console.log(req.body, `Book category`);
  const { bookId, userId } = req.body;
  const result = await WishListService.addToWishList(bookId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book add to wish list successfully`,
    data: result,
  });
});

export const WishListController = {
  addToWishList,
};
