import Book from "../models/books.model.js";

export const createBook = async (req, res) => {
  try {
    const { bookName, authorName, genre, publishedYear } = req.body;

    const book = await Book.findOne({ $and: [{ bookName }, { authorName }] });
    if (book) {
      book.availableCopies += 1;
      await book.save();
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = new Book({
      bookName,
      authorName,
      genre,
      publishedYear,
      availableCopies: 1,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    // Fetch all books with lean() for better performance
    const books = await Book.find().lean();

    if (!books.length) {
      return res.status(404).json({ message: "No books found" });
    }

    console.log("Books: ", books);
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { bookName, authorName, genre } = req.body;

    const searchQuery = {};
    if (bookName) searchQuery.bookName = { $regex: bookName, $options: "i" };
    if (authorName)
      searchQuery.authorName = { $regex: authorName, $options: "i" };
    if (genre) searchQuery.genre = { $regex: genre, $options: "i" };

    // Fetch books that match the search query
    const books = await Book.find(searchQuery).lean();

    if (!books.length) {
      return res.status(404).json({ message: "No matching books found" });
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
