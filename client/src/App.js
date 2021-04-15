import React from 'react';
import {useRoutes} from './routes.js'
import {BrowserRouter as Router} from 'react-router-dom'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



function App() {
  const routes = useRoutes()
  return (
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
  );
}

export default App;