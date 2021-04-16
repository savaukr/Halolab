const {Router} = require('express')
const path = require('path')

const router = Router()

// /api/product
router.get('/', (req, res) => {
	res.sendFile(path.normalize(`${__dirname}/../data.json`))
	//res.send('hello')
})

router.post('/', (req, res) => {
	try {
		const {category, name, price, userName, userPhone} = req.body
		///////////////////////
		res.status(201).json({message: 'Дані успішно отриманні', data:`${category}, ${name}, ${price}`})
	} catch {
		res.status(500).json({message:'Помилка при отриманні даних'})
	}
})

module.exports = router