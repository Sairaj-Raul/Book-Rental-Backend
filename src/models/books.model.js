import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  avalabilty: {
    type: Boolean,
    default: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: String,
    required: true,
  },
  availableCopies: { type: Number, default: 1 },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
