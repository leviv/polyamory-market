import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Markets } from './pages/Markets'
import { Market } from './pages/Market'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <BrowserRouter basename="/polyamory-market">
      <Navbar />

      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/:marketName" element={<Market />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
