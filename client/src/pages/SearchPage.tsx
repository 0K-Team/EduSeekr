/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import SearchComponent from "../components/searchComponent";
import { searchAllData as getSchools } from '../utils/search';
import '../styles/search.css';
import { School } from '../types/school';
import SchoolRecord from '../components/schoolRecord';
import { getAllSchools } from '../api/school';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [rangeValue, setRangeValue] = useState(0);
    const [mathValue, setMathValue] = useState(0);
    const [polValue, setPolValue] = useState(0);
    const [engValue, setEngValue] = useState(0);

    const [schools, setSchools] = useState<School[]>([]);
    const [allSchools, setAllSchools] = useState<School[]>([]);

    const [params] = useSearchParams();

    useEffect(() => {
        setSearchValue(params.get("q") ?? "");
        setRangeValue(parseInt(params.get("distance") ?? "0", 10));
        setMathValue(parseInt(params.get("math") ?? "0", 10));
        setPolValue(parseInt(params.get("pol") ?? "0", 10));
        setEngValue(parseInt(params.get("eng") ?? "0", 10));
        getAllSchools()
        .then(({data}) => {
            setAllSchools(data);
        })
    }, [])

    async function search(query: string) {
        alert(query);
        const data = getSchools(query, allSchools);
        alert(data.length);
        // @ts-ignore
        setSchools(data)
    }

    return (
        <div style={{display: 'flex', marginTop: '1em'}}>
            <div className="filters">
                <div className="searchBar">
                    <SearchComponent setDataFunction={search} value={searchValue} focused={params.has("q")}></SearchComponent>
                </div>
                <div style={{height: '2.5em'}}></div>
                <div style={{ alignItems: 'center' }}>
                    <div className="schoolType" style={{ display: 'flex', alignItems: 'center'}}>
                        <h3 style={{ marginRight: '1em' }}>Typ Szkoły:</h3>
                        <select id='schoolType' style={{ transform: 'scale(1.2)', marginLeft: '1.5em', width: '17em'}}>
                            <option value="0">Dowolna</option>
                            <option value="14">Liceum Ogólnokształcące</option>
                            <option value="16">Technikum</option>
                            <option value="93">Szkoła Branżowa I Stopnia</option>
                            <option value="94">Szkoła Branżowa II Stopnia</option>
                            <option value="15">Liceum Profilowane</option>
                            <option value="17">LO Uzupełniające</option>
                            <option value="20">Szkoła Specjalna</option>
                            <option value="24">Szkoła Muzyczna II Stopnia</option>
                            <option value="86">Ogólnokształcąca SM II Stopnia</option>
                            <option value="26">Szkoła Sztuk Pięknych</option>
                            <option value="27">Liceum Sztuk Plastycznych</option>
                            <option value="31">Szkoła Sztuki Cyrkowej</option>
                            <option value="97">Branżowe Centrum Umiejętności</option>
                        </select>
                    </div>

                    <div className="city" style={{ display: 'flex', alignItems: 'center', marginTop: '1em'}}>
                        <h3 style={{ marginRight: '1em' }}>Miasto:</h3>
                        <input id='city' type="text" style={{marginLeft: '2.7em', width: '19em' }} />
                    </div>

                    <div className="distance" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Dystans (km):</h3>
                        <input
                            id="distance" 
                            type="range" 
                            min="0" 
                            max="500" 
                            style={{ marginLeft: '1em', width: '16em' }} 
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{rangeValue} km</span>
                    </div>

                    <h1 style={{color: 'white', marginLeft: '1em'}}>Matury (min.):</h1>

                    <div className="math" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Matematyka:</h3>
                        <input
                            id="math" 
                            type="range" 
                            min="0" 
                            max="100" 
                            style={{ marginLeft: '1em', width: '16em' }} 
                            value={mathValue}
                            onChange={(e) => setMathValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{mathValue} %</span>
                    </div>
                    <div className="pol" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Polski:</h3>
                        <input
                            id="pol" 
                            type="range" 
                            min="0" 
                            max="100" 
                            style={{ marginLeft: '4.8em', width: '16em' }} 
                            value={polValue}
                            onChange={(e) => setPolValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{polValue} %</span>
                    </div>
                    <div className="eng" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Angielski:</h3>
                        <input
                            id="eng" 
                            type="range" 
                            min="0" 
                            max="100" 
                            style={{ marginLeft: '2.7em', width: '16em' }} 
                            value={engValue}
                            onChange={(e) => setEngValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{engValue} %</span>
                    </div>
                </div>

                <div className='submit' style={{display: 'flex', justifyContent: 'center', marginTop: '3em'}}>
                    <input 
                    type="submit" id='submit' value="Submit"
                    style={{width: '30em', height: '4em'}}
                    />
                </div>
            </div>

            <div className="results">
                {schools.map((school) => (
                   <SchoolRecord school={school} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage;