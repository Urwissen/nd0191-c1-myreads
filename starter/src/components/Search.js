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

    const dummyBook = [{
        id: 11123567,
        imageLinks: {thumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api" } ,
        title: "NO RESULTS",
        authors: ["🥹"],
        shelf: "none",
    }]

    
    useEffect(() => {
        let mounted = true
        let result = []
        if(input && mounted) {
            console.log("if is running! with Input:", input)
            setIsLoading(true)
            result = fetchData(input, 20)
        }
        console.log(result)
        result.length > 0 && mounted && setAllBooks(result)
        
        return () => mounted = false
        
    }, [input])

    const fetchData = async(query, maxResults) => {
        try {
            setIsLoading(true)
            const response = await BooksAPI.search(query, maxResults)
            console.log(response)
            if (response.error) {
                console.log("Reponse with error!")
                setNoResults(true)
                
            } else {
                setNoResults(false)
                setAllBooks(await response)
            }
            
        } catch(error) {
            
            console.log("Fetch Error:", error)
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