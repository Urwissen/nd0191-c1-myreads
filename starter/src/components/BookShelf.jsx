import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function BookShelf({
  shelfTitle, books, changeShelf, addNewBook,
}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              book={book}
              key={book.id}
              id={book.id}
              url={book.imageLinks ? book.imageLinks.thumbnail : '#'}
              title={book.title}
              author={book.authors ? book.authors.map((value) => value) : 'unknown'}
              shelf={book.shelf}
              changeShelf={changeShelf}
              addNewBook={addNewBook}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.arrayOf.isRequired,
  changeShelf: PropTypes.func.isRequired,
  addNewBook: PropTypes.bool,
};

BookShelf.defaultProps = {
  addNewBook: false,
};

export default BookShelf;
