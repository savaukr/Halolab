import React, {useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook.js'
import Loader from "react-loader-spinner";
import {Card} from '../components/Card/Card.js'
import {Inputs} from '../components/Inputs/Inputs'
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
	const userName = useInput('', {isEmpty: true,  isOnlyLetters:true})
	const userPhone = useInput('', {isEmpty: true,  isCountSymvols:12, isOnlyNumbers:true})

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
				userName: userName.value.trim(),
				userPhone: userPhone.value.trim()
			})
			console.log('data:', modalData)
			console.log('Name:', userName.value, '  Phone:', userPhone.value )
			console.log(data)
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

	useEffect(()=>{
		if (isErr.name)  userName.clearInput()
		if (isErr.phone) userPhone.clearInput()
	}, [modalActive])

	const cheapestHandler = () => {
		setModalData({ ...findCheapest([...cards])})
		setModalActive(true)
	}

	if (loading) {
		return (
			<div className="container">
				<Loader 
					type="Circles"
					color= "#00Baaa"
					width={50}
					height={50}
				/>
			</div>
		)
	}

	if (!cards.length) {
		return  (
			<div className="container">
				<p>There is no product</p>
			</div>
		)
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
					isErr={isErr}
					value={{valueName: userName.value.trim(), valuePhone: userPhone.value.trim()}}
				>	
					<Inputs 
						isErr={isErr}
						userName={userName}
						userPhone={userPhone}
					/>
				</Modal>
			</div>
		</div>
	)
}