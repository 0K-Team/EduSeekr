/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import SearchComponent from "../components/searchComponent";
import { searchAllData as getSchools, searchFull } from '../utils/search';
import '../styles/search.css';
import { School } from '../types/school';
import SchoolRecord from '../components/schoolRecord';
import { getAllSchools } from '../api/school';
import { Autocomplete, Pagination, TextField } from '@mui/material';
import { getMajors, getTypes } from '../api/enums';

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [type, setType] = useState([]);
    const [majors, setMajors] = useState([]);
    const [city, setCity] = useState("");
    const [distanceValue, setDistanceValue] = useState(0);
    const [mathValue, setMathValue] = useState(0);
    const [polValue, setPolValue] = useState(0);
    const [engValue, setEngValue] = useState(0);

    const [schools, setSchools] = useState<School[]>([]);
    const [allSchools, setAllSchools] = useState<School[]>([]);

    const [params] = useSearchParams();

    const [page, setPage] = useState(1);

    const [majorsEnum, setMajorsEnum] = useState([]);
    const [types, setTypes] = useState([]);

    const [location, setLocation] = useState<number[]>([]);

    const submitForm = () => {
        const data = searchFull({
            name: searchValue,
            type,
            majors,
            city,
            distance: distanceValue
        })
        // @ts-ignore
        setSchools(data);
    }

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
  
    function errors(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        setSearchValue(params.get("q") ?? "");
        setDistanceValue(parseInt(params.get("distance") ?? "0", 10));
        setType([]);
        setMajors([]);
        setCity(params.get("city") ?? "");
        setMathValue(parseInt(params.get("math") ?? "0", 10));
        setPolValue(parseInt(params.get("pol") ?? "0", 10));
        setEngValue(parseInt(params.get("eng") ?? "0", 10));
        getAllSchools()
        .then(({data}) => {
            setAllSchools(data);
            return getMajors()
        })
        .then(({data}) => {
            setMajorsEnum(data);
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
    }, []);

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
                            options={majorsEnum}
                            getOptionLabel={(option) => option}
                            defaultValue={majors[0]}
                            renderInput={(params) => (
                                <TextField {...params} label="Kierunki Kształcenia" placeholder="" />
                            )}
                            sx={{ width: '500px' }}
                        />
                    </div>

                    <div className="city" style={{ display: 'flex', alignItems: 'center', marginTop: '1em'}}>
                        <TextField defaultValue={city} style={{background: 'white', width: '80%', marginLeft: '10%', border: "none", borderRadius: ".5em"}} id="outlined-basic" label="Miejscowość" variant="outlined" />
                    </div>

                    <div className="distance" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Dystans (km):</h3>
                        <input
                            id="distance" 
                            type="range" 
                            min="0" 
                            max="500" 
                            style={{ marginLeft: '1em', width: '16em' }} 
                            value={distanceValue}
                            onChange={(e) => setDistanceValue(Number(e.target.value))}
                            onSelect={() => {
                                if (location.length == 0) {
                                    alert("To use this feature you need to have Geolocation enabled");
                                }
                            }}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{distanceValue} km</span>
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
                    onSubmit={() => {submitForm()}}
                    />
                </div>
            </div>

            <div className="results">
                {schools.slice((page - 1) * 10, page * 10 - 1).map((school) => (
                    <Link to={`/school/${school.rspo}`} style={{textDecoration: 'none'}}>
                        <SchoolRecord school={school} />
                    </Link>
                ))}
                {schools.length > 0 && <Pagination onChange={(_, v) => {
                    clampPage(v)
                }} count={Math.ceil(schools.length / 10)}/>}
            </div>
        </div>
    )
}

export default SearchPage;