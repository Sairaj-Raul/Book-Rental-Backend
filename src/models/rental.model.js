import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  rentalDate: { type: Date, default: Date.now },
  returnDate: { type: Date, required: true }, // Due date for returning
  returned: { type: Boolean, default: false }, // Track if the book is returned
  returnOnDate: { type: Date, default: null }, // Actual date when book is returned
});

const Rental = mongoose.model("Rental", rentalSchema);
export default Rental;
