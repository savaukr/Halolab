import React, {useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook.js'
import Loader from "react-loader-spinner";
import {Card} from '../components/Card/Card.js'
import {Modal} from '../components/Modal/Modal.js'
import {useValidInput} from '../hooks/validInput.hook.js'

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
	const [form, setForm] = useState({userName:'', userPhone:''})

	const userName = useValidInput('')
	const userPhone = useValidInput('')




	const fetchCards = useCallback(async () => {
		try {
			const data = await request('/api/product', 'GET', null)
			if (data) setCards(data)
		} catch (e) {}
	}, [request])

	const makeOrder = useCallback(async () => {
		try {
			const data = await request('/api/product', 'POST', {...modalData, ...form})
			setModalAnswer(false)
		} catch (e) {}
	}, [request, modalData, form])

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

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}
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
				<input 
					  	placeholder="Name"
					  	id="name"
						name="userName"
						type="text"
						className="input_validate"
						value={userName.value}
						onChange={userName.onChange}
						onBlur={userName.onBlur}
				  />
		          <input 
					  	placeholder="Phone"
					  	id="phone"
						name="userPhone"
						type="text"
						className="input_validate"
						value={userPhone.value}
						onChange={userPhone.onChange}
						onBlur={userPhone.onBlur}
				  />
		          
			</Modal>
		</div>
	)
}