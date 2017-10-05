import React, {Component} from 'react'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

let current_shelf;

class Search extends Component {
  state = {
    query: '',
    booksOnShelf: this.props.booksOnShelf,
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query !== ''){
      BooksAPI.search(query).then((res) => {
        this.setState({ searchResults : res })
      }).catch((error)=>{
        this.setState({ searchResults : [] })
      })
    } else {
      this.setState({ searchResults : [] })
    }
  }

  updateBook = (book, new_shelf) => {
    /* Updates book who's shelf was changed */
    if (!is_in(this.state.booksOnShelf, book))
      this.props.addBook(book, new_shelf)
    else
      this.props.updateBook(book, new_shelf)
  }

  render() {
    let arr = this.state.booksOnShelf
    this.state.searchResults.map(book => {
      if (is_in(arr, book))
        book["shelf"] = current_shelf
      return book
    })
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.state.searchResults && this.state.searchResults.length > 0)? this.state.searchResults.map(book => (
              <li key={book.id}>
                <Book info={book} updateShelf={this.updateBook} />
              </li>
            )) : null}
          </ol>
        </div>
      </div>
    )
  }
}

function is_in(arr, book){
  let result = false;
  arr.map(x => {
    if (book.id === x.id){
      current_shelf = x.shelf
      result = true;
    }
    return x;
  })
  return result;
}

export default Search;
