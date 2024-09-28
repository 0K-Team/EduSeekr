import SearchComponent from "../components/searchComponent";
import '../styles/Landing.css';

const LandingPage = () => {

    return(
        <>
            <div className="content">
                <SearchComponent></SearchComponent>
                <p>Jak używać wyszukiwarko-porównywarki <b>EduSeekr</b></p>
            </div>
        </>
    )
}

export default LandingPage;