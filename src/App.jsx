import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Room from './pages/Room'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
      </Routes>
    </div>
  )
}

export default App