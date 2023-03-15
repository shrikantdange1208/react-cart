import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import CartContainer from '../src/components/CartContainer'
import { useGlobalContext } from './context'

function App() {
  const { loading } = useGlobalContext()

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
