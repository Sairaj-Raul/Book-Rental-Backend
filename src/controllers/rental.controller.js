import Rental from "../models/rental.model.js";
import Book from "../models/books.model.js";

export const rentBook = async (req, res) => {
  try {
    const { userId, bookId, days = 7 } = req.body;

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < 1)
      return res.status(400).json({ message: "Book not available" });

    // Set return date based on days rented
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + days);

    // Create rental record
    const rental = new Rental({
      userId,
      bookId,
      returnDate,
    });

    await rental.save();

    // Reduce availableCopies count by 1
    book.availableCopies -= 1;
    await book.save();
    res.status(201).json({ message: "Book rented successfully", rental });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { rentalId } = req.body;

    // Find the rental record
    const rental = await Rental.findById(rentalId);
    if (!rental)
      return res.status(404).json({ message: "Rental record not found" });

    // Mark as returned
    rental.returned = true;
    rental.returnOnDate = new Date();
    await rental.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingReturns = async (req, res) => {
  try {
    // Find rentals where returnDate is in the past and the book is not yet returned
    const overdueRentals = await Rental.find({
      returnDate: { $lt: new Date() }, // returnDate is before today
      returned: false, // Book is not yet returned
    })
      .populate("userId", "fullName email") // Populate user details
      .populate("bookId", "bookName authorName"); // Populate book details

    res.status(200).json({ overdueRentals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
