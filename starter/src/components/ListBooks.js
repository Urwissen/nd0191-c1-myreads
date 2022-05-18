import React from 'react'
import BookShelf from "./BookShelf";
import { Link } from 'react-router-dom';

const ListBooks = ({isLoading, allBooks, changeShelf}) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {!isLoading ? <div>
                <BookShelf shelfTitle="Currently Reading" books={allBooks.filter(book => book.shelf === "currentlyReading")} changeShelf={changeShelf}/>
                <BookShelf shelfTitle="Want to Read" books={allBooks.filter(book => book.shelf === "wantToRead")} changeShelf={changeShelf}/>
                <BookShelf shelfTitle="Read" books={allBooks.filter(book => book.shelf === "read")} changeShelf={changeShelf}/>
                </div> : <h3>Loading...</h3>}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default ListBooks