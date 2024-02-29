import { Schema, model } from 'mongoose';
import { BookModel, IBook, bookGenre } from './book.interface';

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
    publicationDate: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      enum: bookGenre,
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
    reviews: {
      type: [{ rating: Number, comment: String }],
    },
  },
  {
    timestamps: true,
  },
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
