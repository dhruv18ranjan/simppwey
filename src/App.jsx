import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
