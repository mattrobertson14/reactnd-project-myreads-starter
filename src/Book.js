import React, {Component} from 'react'
//import * as BooksAPI from './BooksAPI'
import './App.css'


class Book extends Component {
	state = {
		currentChoice: ''
	}

	componentDidMount = () => {
		if (this.props.info.shelf){
			this.setState({ currentChoice : this.props.info.shelf })
		} else {
			this.setState({ currentChoice : 'no-shelf' })
		}
	}

	changeShelf = (event) => {
		this.setState({ currentChoice : event.target.value })
		this.props.updateShelf(this.props.info, event.target.value)
	}

	render() {
		const book = this.props.info
		return(
			<div className="book">
        <div className="book-top">
					{(book.imageLinks)?
						<div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>:
						<div className="book-cover" style={{ backgroundImage: `url(${'https://dummyimage.com/130x195/e8e8e8/000000.png&text=Image+Unavailable'})` }}></div>
					}
	        <div className="book-shelf-changer">
	          <select value={this.state.currentChoice} onChange={this.changeShelf}>
	            <option value="none" disabled>Move to...</option>
	            <option value="currentlyReading">Currently Reading</option>
	            <option value="wantToRead">Want to Read</option>
	            <option value="read">Read</option>
	            <option value="no-shelf">None</option>
	          </select>
	        </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors? book.authors.map(author => (
        	<div key={author} className="book-authors">{author}</div>
        )): null}
      </div>
		)
	}
}

export default Book
