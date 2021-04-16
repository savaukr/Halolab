import React, {useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook.js'
import Loader from "react-loader-spinner";
import {Card} from '../components/Card/Card.js'
import {Modal} from '../components/Modal/Modal.js'
import {useInput} from '../hooks/input.hook.js'

import './cardPage.css'


export const CardsPage = () => {
	const {loading, request} = useHttp()

	const [cards, setCards] = useState([])
	const [modalActive, setModalActive] = useState(false)
	const [modalAnswer, setModalAnswer] = useState(false)
	const [modalData, setModalData] = useState({
		category:'',
		name:'',
		price:''
	})
	
	const userName = useInput('', {isEmpty: true, isCountSymvols:3})
	const userPhone = useInput('', {isEmpty: true, isCountSymvols:12})
	const isErr = {
		name: userName.isDirty && userName.errorMessage.length,
		phone: userPhone.isDirty && userPhone.errorMessage.length
	}

	const fetchCards = useCallback(async () => {
		try {
			const data = await request('/api/product', 'GET', null)
			if (data) setCards(data)
		} catch (e) {}
	}, [request])

	const makeOrder = useCallback(async () => {
		try {
			const data = await request('/api/product', 'POST', {
				...modalData,
				userName: userName.value,
				userPhone: userPhone.value
			})
			console.log('data:', modalData)
			console.log('Name:', userName.value, '  Phone:', userPhone.value )
			setModalAnswer(false)
		} catch (e) {}
	}, [request, modalData, userName.value, userPhone.value])

	const findCheapest = useCallback((arrCards) => {
		return arrCards.sort((a, b) => a.price - b.price)[0] || null
	})

	useEffect(() => {
		fetchCards()
	},[fetchCards])

	useEffect(() => {
		if (modalAnswer) {
			makeOrder()
		}
	}, [modalAnswer])

	
	const cheapestHandler = () => {
		setModalData({ ...findCheapest([...cards])})
		setModalActive(true)
	}

	if (loading) {
		return <Loader 
					type="Circles"
					color= "#00Baaa"
					width={50}
					height={50}
				/>
	}
	if (!cards.length) {
		return <p>There is no product</p>
	}

	return (
		<div className="container">
			<div className="cards-wrap">
				<div className="cards">
					{cards.map((card) => {
						return (
							<Card 
								key={card.id || card.name}
								card={card}
								setModalActive={setModalActive}
								setModalData={setModalData}
							/>
						)
					})}
				</div>
				<button className="cheapest__btn" onClick={cheapestHandler}>Buy cheapest</button>
				<Modal
					active={modalActive}
					setActive={setModalActive}
					setAnswer={setModalAnswer}
					modalData={modalData}
				>	
					<div className="input__wrapper">
						<div className='error'>
							{ isErr.name ? 'Error' : '' }
							{ isErr.name ? <span></span> : ''}
						</div>

						<input 
							  	placeholder="Name"
							  	id="name"
								name="userName"
								type="text"
								className={isErr.name ? 'input_validate input_error': 'input_validate'}
								value={userName.value}
								onChange={userName.onChange}
								onBlur={userName.onBlur}
						/>
						{ isErr.name ? <div 
							className='errorClose'
						></div> : ''}
						<div className="errorMessage">
							{ isErr.name ? userName.errorMessage : '' }
						</div>
					</div>
					<div className="input__wrapper">
						<div className='error'>
							{ isErr.phone ? 'Error' : '' }
						</div>
				        <input 
						 	placeholder="Phone"
						 	id="phone"
							name="userPhone"
							type="text"
							className={isErr.phone ? 'input_validate input_error': 'input_validate'}
							value={userPhone.value}
							onChange={userPhone.onChange}
							onBlur={userPhone.onBlur}
						/>
						{ isErr.phone ? <div className='errorClose'></div> : ''}
						<div className="errorMessage">
							{ isErr.phone ? userPhone.errorMessage : '' }
						</div>
					</div>
			          
				</Modal>
			</div>
		</div>
	)
}