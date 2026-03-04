import { useState } from 'react'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>PromptLab</h1>
      <p>Welcome to PromptLab Frontend</p>
    </div>
  )
}

export default App
