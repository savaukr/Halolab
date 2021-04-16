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
						setErrorMessage('')
					}
					break
				case 'isCountSymvols':
					if (value.length < validations[validation]) {
						setCountSymErr(true)
						setErrorMessage(`Should contain ${validations[validation]} characters`)
					} else {
						setCountSymErr(false)
						setErrorMessage('')
					}  
					break
				case 'isOnlyLetters':
					value ? setOnlyLettersErr(false) : setOnlyLettersErr(true) 
				break
				case 'isOnlyNumbers':
					value ? setOnlyNumbersErr(false) : setOnlyNumbersErr(true) 
				break
			}
		}
	}, [value])

	return {errorMessage}

}