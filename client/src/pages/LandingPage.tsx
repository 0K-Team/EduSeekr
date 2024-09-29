import SearchComponent from "../components/searchComponent";
import { useNavigate } from "react-router-dom";
import '../styles/Landing.css';

const LandingPage = () => {
    const navigate = useNavigate();
    return(
            <div className="content">
                <h1 className="landing-h1">Liceum? Technikum? Szkoła branżowa?</h1>
                <p className="landing-p">Znajdź idealną szkołę średnią dla siebie.</p>
                <img src='src/assets/img/magnifying-glass.png' alt="Magnifying Glass" className="landing-image" />
                <div className="landing-searchComponent">
                    <SearchComponent setDataFunction={(q) => {
                        navigate("/search?q=" + q);
                    }}></SearchComponent>
                </div>

                <h2 className="landing-h2">Jak używać wyszukiwarko-przeglądarki szkół średnich <b>EduSeekr</b>?</h2>
                <p className="landing-p2">Wpisz w powyższe pole rodzaj szkoły, jej imię, miasto lub numer. Zostaniesz przeniesiony do zakładki "Znajdź", gdzie wprowadzić możesz dodatkowe filtry, takie jak odległość od twojej lokalizacji, kierunek kształcenia i średni wynik z ostatnich egzaminów maturalnych.</p>
            </div>
    )
}

export default LandingPage;