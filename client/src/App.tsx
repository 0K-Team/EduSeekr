import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import { SchoolPage } from './pages/SchoolPage'

function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/map' element={<MapPage />}></Route>
        <Route path='/compare'></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/school/:rspo' element={<SchoolPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
