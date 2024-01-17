import { Component } from 'react'
import './search-box.styles.css'

// pull in component and initialize class
const SearchBox = (className, placeholder, onChangeHandler) => {
	return (
		<input
			className={`search-box ${className}`}
			type="search"
			placeholder={placeholder}
			// works like onClick, but onChange changes value, used for input instead of buttons
			// turn into an onChangeHandler this way we know we are passing a handler function into this onChange event handler
			onChange={onChangeHandler}
		/>
	)
}

export default SearchBox
