import React from 'react'
import './modal.css'

export const Modal = ({active, setActive, setAnswer, modalData, children, isErr}) => {
	return (
		<div
			className={active ? 'modal__overlay active': 'modal__overlay'}
			onClick = {()=>setActive(false)}
		>
			<div className={active ? 'modal__content active': 'modal__content'} onClick={e=>e.stopPropagation()}>
				<div className="modal__close" 
					onClick = {()=>setActive(false)}
					onMouseDown={(event) => {
			          event.preventDefault();
			        }}
				>
					<span>&times;</span>
				</div>
				<div className="modal__body">
					<div className="card__category">{modalData.category}</div>
					<div className="card__name">{modalData.name}</div>
					<div className="card__price_amount">{modalData.price}</div>
					{children}
					<button
						 className = {`${isErr.name || isErr.phone ? 'disabled' : ''}`}
						 onClick={()=> {
							if (!isErr.name && !isErr.phone) {
								setAnswer(true)
								setActive(false)
							}
						 }}
					>ORDER
					</button>
				</div>
				
			</div>
		</div>

	)
}