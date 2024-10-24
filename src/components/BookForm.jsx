import React from "react";
import "./BookForm.css"; // Assuming you're using an external CSS file for custom styles

const BookForm = ({ handleChange, handleSubmit, isEditing, dataForm }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 my-3 mx-auto w-75 p-4 shadow rounded bg-light"
    >
      <h2 className="text-center mb-4">
        {isEditing ? "Edit Book" : "Add a New Book"}
      </h2>
      <div className="mb-3">
        <label htmlFor="isbn" className="form-label">
          ISBN:
        </label>
        <input
          type="text"
          className="form-control"
          name="isbn"
          id="isbn"
          value={dataForm.isbn}
          onChange={handleChange}
          required
          placeholder="Enter ISBN"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          value={dataForm.title}
          onChange={handleChange}
          required
          placeholder="Enter book title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={dataForm.description}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Enter a brief description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author:
        </label>
        <input
          type="text"
          name="author"
          className="form-control"
          id="author"
          value={dataForm.author}
          onChange={handleChange}
          required
          placeholder="Enter author name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="poster" className="form-label">
          Poster URL:
        </label>
        <input
          type="text"
          name="poster"
          className="form-control"
          id="poster"
          value={dataForm.poster}
          onChange={handleChange}
          placeholder="Enter poster image URL"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">
        {isEditing ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default BookForm;
