import { Component } from 'react'

// pull in component and initialize class
class SearchBox extends Component {
	render() {
		console.log('render-search-box')
		return (
			<input
				className="search-box"
				type="search"
				placeholder="search monsters"
				// works like onClick, but onChange changes value, used for input instead of buttons
				// turn into an onChangeHandler this way we know we are passing a handler function into this onChange event handler
				onChange={this.props.onChangeHandler}
			/>
		)
	}
}

export default SearchBox
