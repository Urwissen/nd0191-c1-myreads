import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from "../BooksAPI"
import BookShelf from './BookShelf'

const Search = ({changeShelf,setShowSearchpage, showSearchPage}) => {
    const [allBooks, setAllBooks] = useState([])
    const [isLoading, setIsLoading] = useState([])
    const [input, setInput] = useState("")
    const [noResults, setNoResults] = useState(false)

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    
    useEffect(() => {
        let mounted = true
        let result = []
        if(input && mounted) {
            setIsLoading(true)
            result = fetchData(input, 20)
        }
        result.length > 0 && mounted && setAllBooks(result)
        return () => mounted = false
    }, [input])

    const fetchData = async(query, maxResults) => {
        try {
            setIsLoading(true)
            const response = await BooksAPI.search(query, maxResults)
            console.log(response)
            if (response.error) {
                setNoResults(true)
            } else {
                setNoResults(false)
                setAllBooks(await response)
            }
            
        } catch(error) {
            console.error("Fetch Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

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
            {!isLoading ?
                <div className="search-books-results">
                    <ol className="books-grid">
                        <li>
                            {noResults ? "No Results" : <BookShelf shelfTitle="Results" books={allBooks} changeShelf={changeShelf} addNewBook={true}/> }
                        </li>    
                    </ol>
                </div>
            : <p>Loading...</p>}
        </div>
    );
}

export default Search