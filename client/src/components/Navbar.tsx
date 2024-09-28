import { Link } from "react-router-dom";
import '../styles/Navbar.css'
const Navbar = () => {
    return(
        <>
        
            <header>
            <div className = "container">
                <Link to="/"> 
                    <h1>Strona główna</h1>
                </Link>
                <Link to="/map"> 
                    <h1>Mapa</h1>
                </Link>
                <Link to="/FAQ"> 
                    <h1>Wszytskie szkoły</h1>
                </Link>
                <Link to="/compare"> 
                    <h1>Porównywarka szkół</h1>
                </Link>
                <Link to="school-choice"> 
                    <h1>Wybór szkoły</h1>
                </Link>

            </div>
            </header>
        
        </>
    )
}

export default Navbar;