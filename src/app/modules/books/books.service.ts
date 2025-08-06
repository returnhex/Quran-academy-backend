// services/books.service.ts
import { IBook } from "./books.interface";
import { Book } from "./books.model";

const getAllBooksDB = async () => {
  return await Book.find({ isDeleted: false });
};

const getSingleBookDB = async (id: string) => {
  const book = await Book.findOne({ _id: id, isDeleted: false });
  if (!book) {
    throw new Error("Book not found or has been deleted!");
  }
  return book;
};

const createBookDB = async (data: IBook) => {
  const exists = await Book.findOne({ title: data.title });
  if (exists) {
    throw new Error("A book with this title already exists!");
  }
  return Book.create(data);
};

const updateBookDB = async (id: string, data: Partial<IBook>) => {
  const updated = await Book.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: data },
    { new: true }
  );
  if (!updated) {
    throw new Error("Unable to update: book not found or deleted!");
  }
  return updated;
};

const softDeleteBookDB = async (id: string) => {
  const deleted = await Book.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
  if (!deleted) {
    throw new Error("Unable to delete: book not found or already deleted!");
  }
  return deleted;
};

export const BooksServices = {
  getAllBooksDB,
  getSingleBookDB,
  createBookDB,
  updateBookDB,
  softDeleteBookDB,
};
