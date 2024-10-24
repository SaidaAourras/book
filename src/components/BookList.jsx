import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import Modal from "react-bootstrap/Modal";
import "./BookList.css"; // Custom CSS for additional styling

const initialState = {
  books: [],
  selectedBook: null,
};

const myReducer = (state, action) => {
  switch (action.type) {
    case "set_data":
      return { ...state, books: action.payload };
    case "ADD-BOOK":
      return { ...state, books: [...state.books, action.payload] };
    case "EDIT-BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.isbn === action.payload.isbn ? action.payload : book
        ),
      };
    case "DELETE-BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.isbn !== action.payload),
      };
    case "VIEW-BOOK":
      return {
        ...state,
        selectedBook:
          state.books.find((book) => book.isbn === action.payload) || null,
      };
    default:
      return state;
  }
};

const BookList = () => {
  const [state, dispatch] = useReducer(myReducer, initialState);
  const [dataForm, setDataForm] = useState({
    isbn: "",
    title: "",
    description: "",
    author: "",
    poster: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("http://localhost:3000/books");
      dispatch({ type: "set_data", payload: res.data });
    };
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...dataForm };

    if (isEditing) {
      dispatch({ type: "EDIT-BOOK", payload: newBook });
      setIsEditing(false);
    } else {
      dispatch({ type: "ADD-BOOK", payload: newBook });
    }

    // Clear form
    setDataForm({
      isbn: "",
      title: "",
      description: "",
      author: "",
      poster: "",
    });
  };

  const deleteBook = (isbn) => {
    dispatch({ type: "DELETE-BOOK", payload: isbn });
  };

  const editBook = (book) => {
    setDataForm(book);
    setIsEditing(true);
  };

  const viewBook = (isbn) => {
    dispatch({ type: "VIEW-BOOK", payload: isbn });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <BookForm
        dataForm={dataForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />
      <h1 className="my-4 text-center">Book List</h1>
      <div className="row">
        {state.books.map((book) => (
          <div className="col-md-3 mb-4" key={book.isbn}>
            {" "}
            {/* Changed to col-md-3 */}
            <div className="card">
              <img
                src={book.poster}
                alt={book.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description.slice(0, 20)}...</p>
                <p className="card-text">
                  <small className="text-muted">Author: {book.author}</small>
                </p>
                <button
                  className="btn btn-outline-success"
                  onClick={() => editBook(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger mx-2"
                  onClick={() => deleteBook(book.isbn)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-info"
                  onClick={() => viewBook(book.isbn)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing book details */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{state.selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state.selectedBook && (
            <div>
              <img
                src={state.selectedBook.poster}
                alt={state.selectedBook.title}
                className="img-fluid mb-3"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <h5>Description:</h5>
              <p>{state.selectedBook.description}</p>
              <p>
                <strong>Author:</strong> {state.selectedBook.author}
              </p>
              <p>
                <strong>ISBN:</strong> {state.selectedBook.isbn}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookList;
