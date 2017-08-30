import React, {Component} from 'react'
import './App.css'


class Book extends Component {
	state = {
		currentChoice: this.props.info.shelf
	}

	changeShelf = (event) => {
		this.props.updateShelf(this.props.info, event.target.value)
	}

	render() {
		const book = this.props.info
		return(
			<div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
	                <div className="book-shelf-changer">
	                  <select value={this.state.currentChoice} onChange={this.changeShelf}>
	                    <option value="none" disabled>Move to...</option>
	                    <option value="currentlyReading">Currently Reading</option>
	                    <option value="wantToRead">Want to Read</option>
	                    <option value="read">Read</option>
	                    <option value="none">None</option>
	                  </select>
	                </div>
              	</div>
              <div className="book-title">{book.title}</div>
              {book.authors.map(author => (
              	<div key={author} className="book-authors">{author}</div>
              ))}
            </div>
		)
	}
}

export default Book
