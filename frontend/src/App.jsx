import React from 'react'
import Register from './componets/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import UpdateInfo from './componets/UpdateInfo'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/update-info" element={<UpdateInfo/>}/>
    </Routes>
  )
}

export default App