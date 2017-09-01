import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    searchResults: [],
    showSearchPage: false
  }

  componentDidMount(){
    /*  Gets all of the books from the server and puts
        them in state in the books array */
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, new_shelf) => {
    /* Updates book who's shelf was changed */
    BooksAPI.update(book, new_shelf)

    /* Updates the book in the books array in state */
    var updatedBooks = findAndChange(this.state.books, book, new_shelf)
    this.setState({ books : updatedBooks })
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query !== ''){
      BooksAPI.search(query).then((res) => {
        this.setState({ searchResults : res })
      })
    } else {
      this.setState({ searchResults : [] })
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false, query: '', searchResults: [] })}>Close</a>
              <div className="search-books-input-wrapper">
                {}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {(this.state.searchResults && this.state.searchResults.length > 0)? this.state.searchResults.map(book => (
                  <li key={book.id}>
                    <Book info={book} updateShelf={this.udpateBook} />
                  </li>
                )) : null}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === 'currentlyReading').map(book => (
                          <li key={book.id}>
                            <Book info={book} updateShelf={this.updateBook} />
                          </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === 'wantToRead').map(book => (
                          <li key={book.id}>
                            <Book info={book} updateShelf={this.updateBook} />
                          </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === 'read').map(book => (
                          <li key={book.id}>
                            <Book info={book} updateShelf={this.updateBook} />
                          </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

/* Finds a book in an array and updates it's shelf */
function findAndChange(books, book, new_shelf) {
  var newArray = books.map((b) => {
    if (b.id === book.id) {
      b.shelf = new_shelf
    }
    return b
  })

  return newArray
}

export default BooksApp
