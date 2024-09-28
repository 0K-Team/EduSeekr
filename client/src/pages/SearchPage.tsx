import React, { useState } from 'react';
import SearchComponent from "../components/searchComponent";
import '../styles/search.css'

const SearchPage = () => {
    const [rangeValue, setRangeValue] = useState(0);

    return (
        <form style={{display: 'flex', marginTop: '1em'}}>
            <div className="filters">
                <div className="searchBar">
                    <SearchComponent></SearchComponent>
                </div>
                <div style={{height: '2.5em'}}></div>
                <div style={{ alignItems: 'center' }}>
                    <div className="schoolType" style={{ display: 'flex', alignItems: 'center'}}>
                        <h3 style={{ marginRight: '1em' }}>Typ Szkoły:</h3>
                        <select id='schoolType' style={{ transform: 'scale(1.2)', marginLeft: '1.5em', width: '17em'}}>
                            <option value="primary">Primary School</option>
                            <option value="secondary">Secondary School</option>
                            <option value="high">High School</option>
                            <option value="university">University</option>
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
                    <div className="math" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Matematyka:</h3>
                        <input
                            id="math" 
                            type="range" 
                            min="0" 
                            max="500" 
                            style={{ marginLeft: '1em', width: '16em' }} 
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{rangeValue} km</span>
                    </div>
                    <div className="pol" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Polski:</h3>
                        <input
                            id="pol" 
                            type="range" 
                            min="0" 
                            max="500" 
                            style={{ marginLeft: '1em', width: '16em' }} 
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{rangeValue} km</span>
                    </div>
                    <div className="eng" style={{ display: 'flex', alignItems: 'center', marginTop: '1em' }}>
                        <h3 style={{ marginRight: '1em' }}>Angielski:</h3>
                        <input
                            id="eng" 
                            type="range" 
                            min="0" 
                            max="500" 
                            style={{ marginLeft: '1em', width: '16em' }} 
                            value={rangeValue}
                            onChange={(e) => setRangeValue(Number(e.target.value))}
                        />
                        <span style={{ marginLeft: '1em', color: 'white' }}>{rangeValue} km</span>
                    </div>
                </div>
            </div>

            <div className="results">

            </div>
        </form>
    )
}

export default SearchPage;