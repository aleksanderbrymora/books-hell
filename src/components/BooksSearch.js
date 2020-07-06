import React, { Component } from 'react';
import axios from 'axios';

class BookSearch extends Component {
	constructor() {
		super();
		this.state = {
			info: [],
		};
		this.fetchInfo = this.fetchInfo.bind(this);
	}

	fetchInfo(q) {
		axios(`https://www.googleapis.com/books/v1/volumes?q=title:${q}`)
			.then((res) => this.setState({ info: res.data.items }))
			.then(() => console.log(this.state.info))
			.catch((error) => console.error(error));
	}

	render() {
		return (
			<div>
				<h1>Search for a book</h1>
				<SearchForm onSubmitWhatever={this.fetchInfo} />
				<DisplayCover info={this.state.info} />
			</div>
		);
	}
}

const DisplayCover = (props) => {
	return (
		<div>
			{props.info.map((book) =>
				book.volumeInfo.imageLinks ? <Book key={book.id} info={book} /> : '',
			)}
		</div>
	);
};

const Book = (props) => {
	return (
		<div>
			<h1>{props.info.volumeInfo.title}</h1>
			<img src={props.info.volumeInfo.imageLinks.thumbnail}></img>
		</div>
	);
};

class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			query: '', // trailing comma
		};
		this._handleInput = this._handleInput.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleInput(event) {
		this.setState({ query: event.target.value });
	}

	_handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmitWhatever(this.state.query);
	}

	render() {
		return (
			<form onSubmit={this._handleSubmit}>
				<input
					type='search'
					placeholder='Jaws'
					required
					onInput={this._handleInput}
				/>
				<input type='submit' value='Search' />
			</form>
		);
	}
}

export default BookSearch;
