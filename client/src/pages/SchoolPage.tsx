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
import { getTypes } from "../api/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const SchoolPage = () => {
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { rspo } = useParams();

    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);

    const [types, setTypes] = useState<{id: string, label: string}[]>([]);

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
            console.log(data);
            return getTypes()
        }).then(({data}) => {
            setTypes(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }, [])

    return loading ? <div>
        <h1>Loading</h1>
      </div> : school ? (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '100%', background: '#1a618a', marginTop: '5vh', color: 'white', fontSize: '3em', padding: '.4em', fontWeight: '900', textAlign: 'center'}}>{school.shortName ?? school.name}</div>
            </div>
            <div style={{display: 'flex', marginTop: '5vh'}}>
                <div ref={mapRef} style={{flex: 1, height: '43.7vh'}}></div>
                <div style={{flex: 1, background: '#1a618a', height: '40vh', color: 'white', padding: '1em'}} className="info">
                    <hr />
                    <p>NAZWA: <span>{school.name}</span></p>
                    <hr />
                    <p>TYP: <span>{types.find((a: {id: string, label: string}) => a.id == `${school.type}`)?.label ?? ""}</span></p>
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
            <div style={{display: 'flex'}}>
              <div style={{flex: 1, background: '#1a618a', color: 'white', padding: '1em'}} className="info">
                <p>Internat: {school.internat ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
                <hr />
                <p>ADRES: <span>{`${school.address.city} ${school.address.street} ${school.address.building}` + (school.address.apartment != null ? `/${school.address.apartment}` : "" + ` ${school.address.postal}`)}</span></p>
                <hr />
                <p>EMAIL: <span>{school.email}</span></p>
                <p>NR TELEFONU: <span>{school.phone}</span></p>
              </div>
              <div style={{flex: 1, background: '#2a81aa'}}>
                <div style={{marginLeft: '1em', marginRight: '1em', color: 'white'}}>
                  <h2>Matury:</h2>
                  <hr />
                  <p>Matematyka: <span>{school.math == -1 ? "Brak danych" : school.math + "%"}</span></p>
                  <hr />
                  <p>Polski (pisemny): <span>{school.polish.written == -1 ? "Brak danych" : school.polish.written + "%"}</span></p>
                  <p>Polski (ustny): <span>{school.polish.oral == -1 ? "Brak danych" : school.polish.oral + "%"}</span></p>
                  <hr />
                  <p>Angielski (pisemny): <span>{school.english.written == -1 ? "Brak danych" : school.english.written + "%"}</span></p>
                  <p>Angielski (ustny): <span>{school.english.oral == -1 ? "Brak danych" : school.english.oral + "%"}</span></p>
                </div>
              </div>
            </div>
        </div>
    ) : (
        <h1>Invalid RSPO: {rspo}</h1>
    ); 
}

export default SchoolPage;