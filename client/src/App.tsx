import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'

function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/map' element={<MapPage />}></Route>
        <Route path='/compare'></Route>
        <Route path='/search'></Route>
        <Route path='/school/{id}'></Route>
      </Routes>
    </Router>
  )
}

export default App
