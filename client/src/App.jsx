import { useState } from 'react'
import './App.css'
import NoteApp from './components/NOTES/NoteApp.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/note' element={<NoteApp />} />
      </Routes>
    </>
  )
}

export default App
