import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './modules/LoginPage'
import HomePage from './modules/HomePage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


function App() {
  console.log('App rendered');
  return (
    <>
      <Router>
          <header>
            <Link to="/home?reset=true" style={{ textDecoration: 'none', color: 'inherit' }}>
              Lumina
            </Link>
          </header>
          <main>
            <section>
              <Routes>
                <Route path="/" element={<LoginPage/>}></Route>
                <Route path="/home" element={<HomePage/>}></Route>
              </Routes>
            </section>
          </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Lumina</p>
        </footer>
      </Router>
    </>
  )
}

export default App
