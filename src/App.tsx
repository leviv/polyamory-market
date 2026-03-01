import { HashRouter, Route, Routes } from 'react-router-dom'
import { Markets } from './pages/Markets'
import { Market } from './pages/Market'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/:marketName" element={<Market />} />
      </Routes>

      <Footer />
    </HashRouter>
  )
}

export default App
