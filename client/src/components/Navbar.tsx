import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <header>
                <div className="container">
                    <Link to="/map" className="link"> 
                        <h1>Mapa</h1>
                    </Link>
                    <Link to="/FAQ" className="link"> 
                        <h1>Wszystkie szkoły</h1>
                    </Link>
                    <Link to="/" className="link eduseekr"> 
                        <h1>EduSeekr</h1>
                    </Link>
                    <Link to="/compare" className="link"> 
                        <h1>Porównywarka szkół</h1>
                    </Link>
                    <Link to="school-choice" className="link"> 
                        <h1>Wybór szkoły</h1>
                    </Link>
                </div>
            </header>
        </>
    );
}

export default Navbar;
