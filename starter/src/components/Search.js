import React from 'react'
import Book from './Book'

const Search = () => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                className="close-search"
                /* onClick={() => setShowSearchpage(!showSearchPage)} */
                >
                Close
                </a>
                <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    <li>
                        <Book /> 
                    </li>    
                </ol>
            </div>
        </div>
    )
}

export default Search