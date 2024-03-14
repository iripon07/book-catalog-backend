import { Schema, model } from 'mongoose';
import { IWishList, WishListModel } from './wishlist.interface';

const wishListSchema = new Schema<IWishList>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: `Book`,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const WishList = model<IWishList, WishListModel>(
  'WishList',
  wishListSchema,
);
