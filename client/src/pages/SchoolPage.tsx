import { useRef } from "react";
import { useEffect, useState } from "react";
import { School } from "../types/school";
import { getSchoolData } from "../api/school";
import { useParams } from "react-router-dom";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import { Point } from "ol/geom";
import { Feature, View, Map } from "ol";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import '../styles/SchoolPage.css'

const SchoolPage = () => {
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { rspo } = useParams();

    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    

    useEffect(() => {
        getSchoolData(rspo ?? "")
        .then(({data}) => {
            setSchool(data);
            const [lon, lat] = data.location.coordinates ?? [0, 0];
            if (mapRef.current && !map.current) {
                const vectorSource = new VectorSource();
    
                const marker = new Feature({
                  geometry: new Point(fromLonLat([lon, lat])),
                });

    
                marker.setStyle(
                  new Style({
                    image: new Icon({
                      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                      scale: 1.0,
                      anchor: [0.5, 1],
                    }),
                  })
                );
            
                vectorSource.addFeature(marker);
                
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                });
            
                  map.current = new Map({
                    target: mapRef.current,
                    layers: [
                      new TileLayer({
                        source: new OSM(),
                      }),
                      vectorLayer,
                    ],
                    view: new View({
                      center: fromLonLat([lon, lat]), // Longitude and Latitude for the map center
                      zoom: 15, // Zoom level
                    }),
                })
            }
            setLoading(false);
        }).catch(e => {
            setLoading(false);
        })
    }, [rspo])

    return loading ? <div>
        <h1>Loading</h1>
      </div> : school ? (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '100%', background: '#1a618a', marginTop: '5vh', color: 'white', fontSize: '3em', padding: '.4em', fontWeight: '900', textAlign: 'center'}}>{school.shortName}</div>
            </div>
            <div style={{display: 'flex', marginTop: '5vh'}}>
                <div ref={mapRef} style={{flex: 1, height: '43.7vh'}}></div>
                <div style={{flex: 1, background: '#1a618a', height: '40vh', color: 'white', padding: '1em'}} className="info">
                    <hr />
                    <p>NAZWA: <span>{school.name}</span></p>
                    <hr />
                    <p>TYP: <span>{school.name}</span></p>
                    <hr />
                    {school.majors?.length > 0 && (
                        <>
                            <p>PRZEDMIOTY ZAWODOWE: <span>{school.majors.join(", ")}</span></p>
                            <hr />
                        </>
                    )}
                    {school.website && (
                        <>
                            <p>STRONA SZKOŁY: <span>{school.website}</span></p>
                            <hr />
                        </>
                    )}
                    
                </div>
            </div>
            {/* <p>RSPO: {school.rspo}</p>
            <p>Typ: {school.type}</p>
            <p>Nazwa: {school.name}</p>
            <p>Krotka nazwa: {school.shortName}</p>
            <p>Przedmioty zawodowe: <br /> {school.majors.join("\n")}</p>
            <p>Strona: {school.website}</p>
            <p>Telefon: {school.phone}</p>
            <p>Email: {school.email}</p>
            <p>Dyrektor imie: {school.principalName}</p>
            <p>Dyrektor nazwisko: {school.principalSurname}</p>
            <p>Internat: {school.internat ? "Tak" : "Nie"}</p> */}
        </div>
    ) : (
        <h1>Invalid RSPO: {rspo}</h1>
    ); 
}

export default SchoolPage;