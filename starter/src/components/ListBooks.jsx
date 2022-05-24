import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

function ListBooks({ isLoading, allBooks, changeShelf }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {!isLoading ? (
          <div>
            <BookShelf shelfTitle="Currently Reading" books={allBooks.filter((book) => book.shelf === 'currentlyReading')} changeShelf={changeShelf} />
            <BookShelf shelfTitle="Want to Read" books={allBooks.filter((book) => book.shelf === 'wantToRead')} changeShelf={changeShelf} />
            <BookShelf shelfTitle="Read" books={allBooks.filter((book) => book.shelf === 'read')} changeShelf={changeShelf} />
          </div>
        ) : <h3>Loading...</h3>}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  allBooks: PropTypes.arrayOf.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default ListBooks;
