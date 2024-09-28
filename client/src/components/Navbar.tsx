import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <header>
                <div className="container">
                    <Link to="/" className="link"> 
                        <h1>Strona główna</h1>
                    </Link>
                    <Link to="/map" className="link"> 
                        <h1>Mapa</h1>
                    </Link>
                    <Link to="/FAQ" className="link"> 
                        <h1>Wszystkie szkoły</h1>
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
