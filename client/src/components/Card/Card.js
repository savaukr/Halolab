import React from 'react'
import'./card.css'

export const Card = ({card, setModalActive, setModalData}) => {
	const byClickHandler = () => {
		setModalData({category: card.category, name:card.name, price: card.price})
		setModalActive(true)
	}
	return (
		<div className='card-wrap'>
			<div className="card__category">{card.category}</div>
			<div className="card__name">{card.name}</div>
			<div className="card__price">
				<div>
					<span className="card__price">{card.price}</span>
					<button 
						className="card__price card__price_btn"
						onClick={byClickHandler}
					>
						BUY
					</button>
				</div>
				
			</div>
		</div>
	)
}