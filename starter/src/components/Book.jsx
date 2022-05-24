import React from 'react';

function Book({
  book, url, title, author, changeShelf, shelf = 'none', addNewBook = false,
}) {
  const handleChange = (e) => {
    const shelfValue = e.target.value;
    console.log('change shelf to:', shelfValue);
    changeShelf(book, shelfValue, addNewBook);
  };

  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 130,
              height: 175,
              backgroundImage: `url(${url})`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={handleChange} value={shelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {title}
        </div>
        <div className="book-authors">{author}</div>
      </div>
    </div>
  );
}

export default Book;