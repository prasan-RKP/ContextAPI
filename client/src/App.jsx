import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NoteApp from './components/NoteApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NoteApp />
    </>
  )
}

export default App
