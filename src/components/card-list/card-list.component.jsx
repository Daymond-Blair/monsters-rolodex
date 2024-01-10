import { Component } from 'react'
import './card-list.styles.css'
import Card from '../card/card.component'
//bring in relevant class component

class CardList extends Component {
	//render something just to make sure the component is working...
	render() {
		console.log('render-card-list')
		//destructuring off this.props - if we need to use this in more places than one its easier to do so
		const { monsters } = this.props

		return (
			<div className="card-list">
				{monsters.map((monster) => {
					return <Card monster={monster} />
				})}
			</div>
		)
	}
}

//export allows other files to import the code we write in here to the outside this is what makes this component able to be linked or pulled into another file we're working on
export default CardList
