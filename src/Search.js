import React, {Component} from 'react'
import Book from './Book.js'
import { Link } from 'react-router-dom'

class Search extends Component {

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.props.query} onChange={(event) => this.props.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.props.books && this.props.books.length > 0)? this.props.books.map(book => (
              <li key={book.id}>
                <Book info={book} updateShelf={this.props.updateBook} />
              </li>
            )) : null}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
