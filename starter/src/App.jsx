import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import ListBooks from './components/ListBooks';
import * as BooksAPI from './BooksAPI';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await BooksAPI.getAll();
      setAllBooks(await response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeShelf = (book, shelf, addBook) => {
    BooksAPI.update(book, shelf);
    if (addBook) {
      console.log('setup new book');
      setAllBooks((prev) => [...prev, book]);
    } else {
      setAllBooks((prevBooks) => prevBooks.map((prevBook) => {
        console.log(book, prevBook);
        return (
          prevBook.id === book.id ? { ...prevBook, shelf } : { ...prevBook }
        );
      }));
    }
  };

  console.log('allBooks:', allBooks);
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <ListBooks
              isLoading={isLoading}
              allBooks={allBooks}
              changeShelf={changeShelf}
            />
            )}
        />
        <Route
          path="/search"
          element={(
            <Search
              changeShelf={changeShelf}
              setShowSearchpage={setShowSearchpage}
              showSearchPage={showSearchPage}
            />
            )}
        />
      </Routes>
    </div>
  );
}

export default App;
