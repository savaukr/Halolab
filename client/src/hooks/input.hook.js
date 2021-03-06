import {useState} from 'react'
import {useValidation} from './validation.hook.js'

export const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setDirty] = useState(false)

	const valid = useValidation(value, validations)

	const onChange = (e) => {
		setDirty(false)
		setValue(e.target.value)
	}

	const onBlur = () => {
		setDirty(true)
	}

	const errorCloseClick = (elem) => {
		setDirty(false)
		setValue('')
		valid.message=''
		elem.focus()
	} 
	const clearInput = () => {
		setDirty(false)
		setValue('')
		valid.message=''
	}

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		errorCloseClick,
		clearInput,
		...valid
	}
}

