const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000  
const app = express()

app.use(express.json({extended: true}))

app.use('/api/product', require('./routes/product.routes.js'))

// if (process.env.NODE_ENV === 'production') {
// 	app.use('/', express.static(path.join(__dirname, 'client', 'build')))
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// 	})
// }

async function start() {
	try {
		app.listen(PORT, () => {console.log(`App has been started on port ${PORT}...`)})
	} catch(e) {
		console.log("Server Error", e.message)
		process.exit(1)
	}
}

start()