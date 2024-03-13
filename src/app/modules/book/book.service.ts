import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../Helper/paginationHelper';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { User } from '../user/user.model';
import { bookFilterableFields } from './book.constant';
import { IBook, IBookFilters, IBookReview } from './book.interface';
import { Book } from './book.model';

const createBook = async (
  payload: IBook,
  userInfo: JwtPayload | null,
): Promise<IBook | null> => {
  const isUserExist = await User.findOne({ email: userInfo?.email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not exist`);
  }
  payload.createdBy = isUserExist?._id;
  const result = (await Book.create(payload)).populate('createdBy');
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not created');
  }
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortOrder, sortBy } =
    paginationHelper.calculatePagination(paginationOptions);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: new RegExp(value, 'i') },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions)
    .populate('createdBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (payload: string): Promise<IBook | null> => {
  const _id = payload;
  const result = await Book.findById(_id);
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  userInfo: JwtPayload | null,
): Promise<IBook | null> => {
  const user = await User.findOne({ email: userInfo?.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found`);
  }
  console.log(payload, 'book info');
  const isBookExist = await Book.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const result = await Book.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBook = async (payload: string): Promise<IBook | null> => {
  const _id = payload;
  const result = await Book.findByIdAndDelete(_id);
  return result;
};

const reviewBook = async (
  id: string,
  payload: Partial<IBookReview>,
): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  const review = {
    rating: payload.rating,
    comment: payload.comment,
  };
  const result = await Book.findByIdAndUpdate(
    { _id: id },
    { $push: { reviews: review } },
    {
      new: true,
    },
  );

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  reviewBook,
};
