import React from 'react'
import'./card.css'

export const Card = ({card, setModalActive, setModalData}) => {
	const buyClickHandler = () => {
		setModalData({category: card.category, name:card.name, price: card.price})
		setModalActive(true)
	}
	return (
		<div className='card-wrap'>
			<div className="card__category">{card.category}</div>
			<div className="card__name">{card.name}</div>
			<div className="card__price">
					<div className="card__price_amount">{card.price}</div>
					<button 
						className="card__price_btn"
						onClick={buyClickHandler}
					>
						BUY
					</button>
			</div>
		</div>
	)
}