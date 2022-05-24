import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';

function Search({ changeShelf }) {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [input, setInput] = useState('');
  const [noResults, setNoResults] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const fetchData = async (query, maxResults) => {
    try {
      setIsLoading(true);
      const response = await BooksAPI.search(query, maxResults);
      console.log(response);
      if (response.error) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setAllBooks(await response);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let result = [];
    if (input && mounted) {
      setIsLoading(true);
      result = fetchData(input, 20);
    }
    if (result.length > 0 && mounted) setAllBooks(result);
    return () => { mounted = false; };
  }, [input]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={input}
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleInput}
          />
        </div>
      </div>
      {!isLoading
        ? (
          <div className="search-books-results">
            <ol className="books-grid">
              <li>
                {noResults ? 'No Results' : <BookShelf shelfTitle="Results" books={allBooks} changeShelf={changeShelf} addNewBook /> }
              </li>
            </ol>
          </div>
        )
        : <p>Loading...</p>}
    </div>
  );
}

Search.propTypes = {
  changeShelf: PropTypes.func.isRequired,
};

export default Search;
