import './App.css'
import { Component } from 'react'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
class App extends Component {
	// this is the main component, there is only EVER ONE, this component is what imports all the reusable components and builds out the DOM its like index.js
	constructor() {
		super()

		this.state = {
			//empty array to pull in data with API
			//keep original list here
			monsters: [],
			searchField: '',
		}
	}

	//lifecycle methods - componentDidMount, componentDidUpdate, componentWillUnmount

	//this code will get run whenever a component mounts or gets placed on the DOM this only happens once in its life, this is the method where API data is pulled in
	componentDidMount() {
		//native function used to get API data from a URL
		//pull data, if successful convert it into json, then place it in users and call setState to fill monsters array with users
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			// here we can either pass in the object directly or create a function to make monsters point to users - choosing the function approach here in order to also use a callback to check that everything worked
			.then((users) =>
				this.setState(() => {
					return { monsters: users }
				}),
			)
	}

	onSearchChange = (event) => {
		const searchField = event.target.value.toLocaleLowerCase()

		this.setState(() => {
			return { searchField }
		})
	}

	render() {
		const { monsters, searchField } = this.state
		const { onSearchChange } = this

		const filteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField)
		})
		return (
			// VIRTUAL DOM

			<div className="App">
				{/* use imported class components to build out UI */}
				{/* the search-box uses an onChange handler prop so we can call that as an attribute and set it to onSearchChange */}
				<h1 className="app-title">Monster's Rolodex</h1>
				<SearchBox
					className="monsters-search-box"
					onChangeHandler={onSearchChange}
					placeholder="search monsters"
				/>
				<CardList monsters={filteredMonsters} />
			</div>
		)
	}
}

//PROPS - shorthand for properties, they are identical to the attributes in a tag component (className, type, placeholder, onClick, onChange, data-cta="learn")
// react gives us a keyword "props" - this.props references the class props
// when props change, component will re-render
// components re-render when setState is called and when props are updated
// we can map over an array then assign it to setState to create a prop that can map
// the top-level component "parent component" runs then any children in that component run, this creates the COMPONENT TREE
// react renders onMount and re-renders if setState "updating the state" is called or props change

// COMPONENTS - write a more scalable, maintainable, and more useable application
// app is a component, its meant to tie together functionality, useable code, and layout.
// components should be as generic and singular as possible so that they can be re-useable in multiple places
// components must only be encapsulated in ONE PARENT/TOP-LEVEL TAG - if trying to use two parent tags rather than nesting content inside the one parent tag, there will be an ERROR
//

//OPTIMIZATIONS - lets get into the weeds
//opt1 - pull the onChange function up into the render, this attaches it to the class so the function only needs to be created once. If we leave it in the Render, it gets created everytime the page is re-rendered which kills performance.
//opt2 - pull "this" off of the function declarations in render by casting them to this and this.state - this makes the attributes on input tag much cleaner and easier to read since you can instantly see what is being called and refer above to the definition if needed.

//todo - make search filter off order of characters typed rather than if the chars exist in the word. If I'm trying to type ERvin Howell, I shouldn't see Glenna ReichERt - her name should be excluded from the initial

// each HTML tag in JSX is actually a react component, this is what allows us to bind functionality to the tags like real HTML
// what order does React run everything? constructor -> render (template of html/initial UI mounted to the DOM) -> componentDidMount (grab API data or anything else that should be updated on the page) -> re-render (mount a new html template to the DOM but with the updated data from setState)

// what order to build the app? skeleton -> functionality -> styling
// before we start coding, think about what it is we need to do (requirements) this helps plan out the code to write

//search bar feature - input field, type in text, filter monsters array based on input, include a clickable close button
export default App
