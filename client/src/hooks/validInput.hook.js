import Reat, {useState} from 'react'

export const useValidInput = (initialValue) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setDirty] = useState(false)

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const onBlur = () => {
		setDirty(true)
		console.log('blur')
	}

	return {
		value,
		onChange,
		onBlur
	}
}

