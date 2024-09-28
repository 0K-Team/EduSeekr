import React, { useRef, useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Overlay from 'ol/Overlay';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const [selectedSchool, setSelectedSchool] = useState<Feature | null>(null);

  // List of coordinates (longitude, latitude)
  const coordinates: [number, number, number, string, string, number][] = [
    [19.932420730591, 50.060451507568, 14, "Liceum Tak", "JEEW 7 3/7", 432],
    [19.923054236531296, 50.04630534675545, 16, "Technikum Łączności", "Monte Cassino 31", 663],
    [20.009515691240214, 50.013762659357596, 94, "Szkoła Branżowa Solenia Ziemniaków", "Ziemniaczana Po/TATO", 123],
  ];

  useEffect(() => {
    if (mapRef.current && !map.current) {
      const vectorSource = new VectorSource();

      coordinates.forEach((coordinate) => {
        const [lon, lat, typeNo, name, address, schoolID] = coordinate;
        const marker = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          typeNo,
          name,
          address,
          schoolID,
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
              scale: 1,
              anchor: [0.5, 1],
            }),
          })
        );

        vectorSource.addFeature(marker);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const overlay = new Overlay({
        element: popupRef.current || undefined,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, 150],
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
          center: fromLonLat([19.9363912, 50.0573861]), // Longitude and Latitude for the map center
          zoom: 13, // Zoom level
        }),
        overlays: [overlay],
      });

      const selectClick = new Select({
        condition: click,
      });

      map.current.addInteraction(selectClick);

      selectClick.on('select', (event) => {
        const feature = event.selected[0];
        if (feature) {
          const geometry = feature.getGeometry() as Point;
          const coordinates = geometry.getCoordinates();
          overlay.setPosition(coordinates);
          setSelectedSchool(feature);
        } else {
          setSelectedSchool(null);
        }
      });
    }
  }, [coordinates]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div ref={mapRef} style={{ flex: '3', height: '90vh' }}></div>
      <div ref={popupRef} style={{ position: 'absolute', backgroundColor: 'white', padding: '5px', border: '1px solid black', borderRadius: '4px', bottom: '50px', transform: 'translate(-50%, -100%)', minWidth: '10em' }}>
        {selectedSchool && (
          <div>
            <div><strong>{selectedSchool.get('name')}</strong></div>
            <div>{selectedSchool.get('address')}</div>
            <div>
              <button onClick={() => window.location.href = selectedSchool.get('schoolID')}>Go to page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
