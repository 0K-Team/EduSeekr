import SearchComponent from "../components/searchComponent";
import { useNavigate } from "react-router-dom";
import '../styles/Landing.css';

const LandingPage = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className="content">
                <SearchComponent setDataFunction={(q) => {
                    navigate("/search?q=" + q);
                }}></SearchComponent>
            </div>
        </>
    )
}

export default LandingPage;