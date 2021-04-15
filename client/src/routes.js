import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {CardsPage}  from './pages/CardsPage.js'

export const useRoutes = isAuthenticated => {
	
	return (
		<Switch>
			<Route path="/" exact>
				<CardsPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}