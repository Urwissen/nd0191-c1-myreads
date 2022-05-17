import React from 'react'
import Book from './Book'

const BookShelf = ({shelfTitle, books, changeShelf}) => {
    console.log(shelfTitle, books)


    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">        
                    {books.map(book => {
                        return(
                            <Book 
                                key={book.id}
                                id={book.id}
                                url={book.imageLinks.thumbnail} 
                                title={book.title} 
                                author={book.authors[0]}
                                shelf={book.shelf}
                                changeShelf={changeShelf}
                            />
                        )
                    })}     
                </ol>
            </div>
        </div>
    );
}

export default BookShelf