import React, {Component} from 'react'
import Book from './Book.js'

class Shelf extends Component {
  render(){
    let shelfValue = this.props.shelfValue
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.booksList.filter(book => book.shelf === shelfValue).map(book => (
                <li key={book.id}>
                  <Book info={book} updateShelf={this.props.updateShelf} />
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
