/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import SearchComponent from "../components/searchComponent";
import { searchAllData as getSchools } from '../utils/search';
import '../styles/search.css';
import { School } from '../types/school';
import SchoolRecord from '../components/schoolRecord';
import { getAllSchools } from '../api/school';
import { Autocomplete, Pagination, TextField } from '@mui/material';
import { getMajors, getTypes } from '../api/enums';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [rangeValue, setRangeValue] = useState(0);
    const [mathValue, setMathValue] = useState(0);
    const [polValue, setPolValue] = useState(0);
    const [engValue, setEngValue] = useState(0);

    const [schools, setSchools] = useState<School[]>([]);
    const [allSchools, setAllSchools] = useState<School[]>([]);

    const [params] = useSearchParams();

    const [page, setPage] = useState(1);

    const [majors, setMajors] = useState([]);
    const [types, setTypes] = useState([]);

    const [location, setLocation] = useState<number[]>([]);

    const clampPage = (page: number) => {
        if (page > 0 && page < Math.ceil(schools.length / 10)) setPage(page);
        else if (page < 0) {
            setPage(1);
        } else {
            setPage(Math.ceil(schools.length / 10))
        }
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos: {coords: {longitude: number, latitude: number}}) {
      const crd = pos.coords;
      setLocation([crd.longitude, crd.latitude]);
    }
  
    function errors(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        setSearchValue(params.get("q") ?? "");
        setRangeValue(parseInt(params.get("distance") ?? "0", 10));
        setMathValue(parseInt(params.get("math") ?? "0", 10));
        setPolValue(parseInt(params.get("pol") ?? "0", 10));
        setEngValue(parseInt(params.get("eng") ?? "0", 10));
        getAllSchools()
        .then(({data}) => {
            setAllSchools(data);
            return getMajors()
        })
        .then(({data}) => {
            setMajors(data);
            return getTypes()
        })
        .then(({data}) => {
            console.log(data);
            setTypes(data);
        })
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                console.log(result);
                if (result.state === "granted") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                    setLocation([]);
                }
            });
        } else {
        console.log("Geolocation is not supported by this browser.");
        }
    }, [])

    async function search(query: string) {
        const data = getSchools(query, allSchools);
        // @ts-ignore
        setSchools(data)
    }

    return (
        <div style={{display: 'flex', marginTop: '1em'}}>
            <div className="filters">
                <h1 className="search-h1">Wyszukaj szkołę</h1>
                <div className="searchBar">
                    <SearchComponent setDataFunction={search} value={searchValue} focused={params.has("q")}></SearchComponent>
                </div>
                <div style={{height: '2.5em'}}></div>
                <div style={{ alignItems: 'center' }}>
                    <div className="schoolType" style={{ display: 'flex', alignItems: 'center'}}>
                    <Autocomplete
                            style={{background: 'white', width: '80%', marginLeft: '10%'}}
                            multiple
                            limitTags={2}
                            id="multiple-limit-tags"
                            options={types}
                            // @ts-ignore
                            getOptionLabel={(option) => option.label}
                            defaultValue={types[0]}
                            renderInput={(params) => (
                                <TextField {...params} label="Typy Szkół" placeholder="" />
                            )}
                            sx={{ width: '500px' }}
                        />
                    </div>

                    <div className='majors' style={{ display: 'flex', alignItems: 'center', marginTop: '1em'}}>
                        <Autocomplete
                            style={{background: 'white', width: '80%', marginLeft: '10%'}}
                            multiple
                            limitTags={2}
                            id="multiple-limit-tags"
                            options={majors}
                            getOptionLabel={(option) => option}
                            defaultValue={majors[0]}
                            renderInput={(params) => (
                                <TextField {...params} label="Kierunki Kształcenia" placeholder="" />
                            )}
                            sx={{ width: '500px' }}
                        />
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
                            onSelect={(e) => {
                                if (location.length == 0) {
                                    alert("To use this feature you need to have Geolocation enabled");
                                }
                            }}
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
                {schools.slice((page - 1) * 10, page * 10 - 1).map((school) => (
                   <SchoolRecord school={school} />
                ))}
                {schools.length > 0 && <Pagination onChange={(e, v) => {
                    clampPage(v)
                }} count={Math.ceil(schools.length / 10)}/>}
            </div>
        </div>
    )
}

export default SearchPage;