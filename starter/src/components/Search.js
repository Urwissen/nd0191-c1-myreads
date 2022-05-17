import { useState, useEffect} from 'react'
import Book from './Book'
import * as BooksAPI from "../BooksAPI"
import BookShelf from './BookShelf'

const Search = ({changeShelf,setShowSearchpage, showSearchPage}) => {
    const [allBooks, setAllBooks] = useState([])
    const [isLoading, setIsLoading] = useState([])
    const [input, setInput] = useState("")

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const noResults = {
        id: 11123567,
        imageLinks: {thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api" } ,
        title: "NO RESULTS",
        authors: ["🥹"],
        shelf: "none",
    }

    /* todo - fix bug */
    useEffect(() => {
        let result = []
        if(input) {
            result = fetchData(input, 20)
        }
        
        result.length > 0 && setAllBooks(result)
    }, [input])

    const fetchData = async(query, maxResults) => {
        try {
            setIsLoading(true)
            const response = await BooksAPI.search(query, maxResults)
            console.log(response)
            setAllBooks(await response)
        } catch(error) {
            setAllBooks([noResults])
            console.log(error)
            
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                className="close-search"
                onClick={() => setShowSearchpage(!showSearchPage)}
                >
                Close
                </a>
                <div className="search-books-input-wrapper">
                <input
                    value={input}
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    onChange={handleInput}
                />
                </div>
            </div>
            {!isLoading ?
                <div className="search-books-results">
                    <ol className="books-grid">
                        <li>
                            <BookShelf shelfTitle="Results" books={allBooks} changeShelf={changeShelf}/> 
                        </li>    
                    </ol>
                </div>
            : <p>Loading...</p>}
        </div>
    );
}

export default Search