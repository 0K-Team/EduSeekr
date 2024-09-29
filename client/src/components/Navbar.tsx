import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/" className="link eduseekr"> 
                    <h1>EduSeekr</h1>
                </Link>

                <Link to="/map" className="link"> 
                    <div className="faMap">
                       <FontAwesomeIcon icon={faMap} />
                        <span>Map</span>
                    </div>
                </Link>

                <Link to="/search" className="link"> 
                    <div className="anim">
                        <span className="animBtn"> <FontAwesomeIcon icon={faMap} /></span>
                        <span className="animText">  Search</span>
                    </div>
                </Link>

                <Link to="/compare" className="link"> 
                    <h1>Porównywarka szkół</h1>
                </Link>
                <Link to="/school-choice" className="link"> 
                    <h1>Wybór szkoły</h1>
                </Link>
                
            </div>
        </header>
    );
}

export default Navbar;
