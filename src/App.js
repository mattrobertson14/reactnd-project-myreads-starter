import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    searchResults: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, new_shelf) => {
    BooksAPI.update(book, new_shelf)
    var updatedBooks = findAndChange(this.state.books, book, new_shelf)
    this.setState({ books : updatedBooks })
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (BooksAPI.search(query)){
      BooksAPI.search(query).then((res) => {
        this.setState({ searchResults : res })
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {(this.state.searchResults && this.state.searchResults.length > 0)? this.state.searchResults.map(book => (
                  <li key={book.id}>
                    <Book info={book} updateShelf={this.updateShelf} />
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
