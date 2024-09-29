import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMap, faRepeat } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/" className="link eduseekr"> 
                    <h1>EduSeekr</h1>
                </Link>

                <Link to="/map" className="link"> 
                    <div className="faMap anim">
                        <span> <FontAwesomeIcon icon={faMap} />  Mapa</span>
                        <span > </span>
                    </div>
                </Link>

                <Link to="/search" className="link"> 
                    <div className="anim">
                        <span > <FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                        <span>  Szukaj</span>
                    </div>
                </Link>

                <Link to="/compare" className="link"> 
                <span > <FontAwesomeIcon icon={faRepeat} /> </span>
                <span>  Porównywarka</span>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
