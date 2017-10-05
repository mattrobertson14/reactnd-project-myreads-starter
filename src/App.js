import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import Shelf from './Shelf.js'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount(){
    /*  Gets all of the books from the server and puts
        them in state in the books array */
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, new_shelf) => {
    /* Updates book who's shelf was changed in the API, then in the state */
    if (!book.shelf || book.shelf !== new_shelf){
      BooksAPI.update(book, new_shelf).then((res) => {
        let updatedBooks = findAndChange(this.state.books, book, new_shelf)
        this.setState({ books : updatedBooks })
      })
    }
  }

  newBookFromSearch = (book, new_shelf) => {
    let updatedBooks = this.state.books
    updatedBooks.push(book)
    this.setState({ books : updatedBooks })
    this.updateBook(book, new_shelf)
  }

  render() {
    return (
      <div className="app">
      <Route path="/search" render={()=>(
        <Search
          updateBook={this.updateBook}
          booksOnShelf={this.state.books}
          addBook={this.newBookFromSearch}
        />
      )}/>
      <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  shelfName="Currently Reading"
                  shelfValue="currentlyReading"
                  booksList={this.state.books}
                  updateShelf={this.updateBook}
                />
                <Shelf
                  shelfName="Want to Read"
                  shelfValue="wantToRead"
                  booksList={this.state.books}
                  updateShelf={this.updateBook}
                />
                <Shelf
                  shelfName="Read"
                  shelfValue="read"
                  booksList={this.state.books}
                  updateShelf={this.updateBook}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

/* Finds a book in an array and updates it's shelf */
function findAndChange(books, book, new_shelf) {
  let newArray = books.map((b) => {
    if (b.id === book.id) {
      b.shelf = new_shelf
    }
    return b
  })

  return newArray
}

export default BooksApp
