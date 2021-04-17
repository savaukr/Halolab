import {useEffect, useState} from 'react'

export const useValidation = (value, validations) => {
	
	const [emptyErr, setEmptyErr] = useState(true)
	const [onlyLettersErr, setOnlyLettersErr] = useState(false)
	const [onlyNumbersErr, setOnlyNumbersErr] = useState(false)
	const [countSymErr, setCountSymErr] = useState(false)

	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'isEmpty':
					if (!value) {
						setEmptyErr(true) 
						setErrorMessage('This field in required')
					} else  {
						setEmptyErr(false)
					}
					break
				case 'isOnlyLetters':
					if (!/^[a-zA-Zа-яА-Я]*$/.test(value)) {
						setOnlyLettersErr(true)
						setErrorMessage('Only letters allowed')
					} else {
						setOnlyLettersErr(false)
					}
					break
				case 'isOnlyNumbers':
					if (!/^[0-9]*$/.test(value)) {
						setOnlyNumbersErr(true)
						setErrorMessage('Only numbers allowed')
					} else {
						setOnlyNumbersErr(false)
					} 
				break
				case 'isCountSymvols':
					if ((value.length < validations[validation]) && (value.length !== 0) ) {
						setCountSymErr(true)
						setErrorMessage(`Should contain ${validations[validation]} characters`)
					} else {
						setCountSymErr(false)
					}  
					break
				
			}
		}
		if ( !(emptyErr || onlyLettersErr || onlyNumbersErr || countSymErr) ) setErrorMessage('')
	}, [value])
	
	return {errorMessage}

}