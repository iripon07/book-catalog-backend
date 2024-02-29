import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishingDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId, // User --> _id
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    ratings: [{ type: Number }],
    reviews: [{ type: String }],
    price: {
      type: Number,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
