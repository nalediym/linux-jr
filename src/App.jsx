import { useState } from 'react'
import Terminal from './components/Terminal'

export default function App() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Terminal />
    </div>
  )
}
