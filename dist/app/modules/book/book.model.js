'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Book = void 0;
const mongoose_1 = require('mongoose');
const book_interface_1 = require('./book.interface');
const bookSchema = new mongoose_1.Schema(
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
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      enum: book_interface_1.bookGenre,
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
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
