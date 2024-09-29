import { useRef, useEffect, useState, memo } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Overlay from 'ol/Overlay';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import { MinimalSchool } from '../types/school';
import { fetchSchools } from '../api/map';
import { useNavigate } from 'react-router-dom';
import Cluster from 'ol/source/Cluster';
import { Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';

const MapComponent = memo(function MapComponent() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const navigate = useNavigate();

  const [selectedSchool, setSelectedSchool] = useState<Feature | null>(null);

  // Function to generate a small random offset in meters
  const getRandomOffset = () => {
    const offset = 0.0001; // Adjust this value to control the separation distance
    return (Math.random() - 0.5) * offset;
  };

  useEffect(() => {
    fetchSchools()
      .then(({ data }) => {
        if (mapRef.current && !map.current) {
          const vectorSource = new VectorSource();

          data.forEach((school: MinimalSchool) => {
            let [lon, lat] = school.location.coordinates;

            // Apply random offset to the coordinates
            lon += getRandomOffset();
            lat += getRandomOffset();

            const marker = new Feature({
              geometry: new Point(fromLonLat([lon, lat])),
              typeNo: school.type,
              name: school.name,
              schoolID: school.rspo,
            });

            let iconSrc = 'src/assets/markers/map-marker-blue.svg'; // Default marker

            // Change the icon source based on the school type
            if ([14, 15, 17].includes(school.type)) {
              iconSrc = 'src/assets/markers/map-marker-blue.svg';
            } else if (school.type === 16) {
              iconSrc = 'src/assets/markers/map-marker-green.svg';
            } else if ([93, 94, 97].includes(school.type)) {
              iconSrc = 'src/assets/markers/map-marker-red.svg';
            }

            marker.setStyle(
              new Style({
                image: new Icon({
                  src: iconSrc,
                  scale: 0.2,
                  anchor: [0.5, 1],
                }),
              })
            );

            vectorSource.addFeature(marker);
          });

          const clusterSource = new Cluster({
            distance: 20,
            source: vectorSource,
          });

          const clusterLayer = new VectorLayer({
            source: clusterSource,
            style: (feature) => {
              const size = feature.get('features').length;
              let style;
              if (size > 1) {
                style = new Style({
                  image: new CircleStyle({
                    radius: 10,
                    stroke: new Stroke({
                      color: '#fff',
                    }),
                    fill: new Fill({
                      color: '#3399CC',
                    }),
                  }),
                  text: new Text({
                    text: size.toString(),
                    fill: new Fill({
                      color: '#fff',
                    }),
                  }),
                });
              } else {
                const originalFeature = feature.get('features')[0];
                style = originalFeature.getStyle();
              }
              return style;
            },
          });

          const overlay = new Overlay({
            element: popupRef.current || undefined,
            positioning: 'bottom-center',
            stopEvent: true, // Set stopEvent to
            offset: [0, 150],
          });

          map.current = new Map({
            target: mapRef.current,
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
              clusterLayer,
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
              const features = feature.get('features');
              if (features.length === 1) {
                const originalFeature = features[0];
                const geometry = originalFeature.getGeometry() as Point;
                const coordinates = geometry.getCoordinates();
                overlay.setPosition(coordinates);
                setSelectedSchool(originalFeature);
              } else {
                setSelectedSchool(null);
              }
            } else {
              setSelectedSchool(null);
            }
          });
        }
      })
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div ref={mapRef} style={{ flex: '3', height: '90vh' }} id="map"></div>
      <div
        ref={popupRef}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: '5px',
          border: '1px solid black',
          borderRadius: '4px',
          bottom: '50px',
          transform: 'translate(-50%, -100%)',
          minWidth: '10em',
          display: selectedSchool ? 'block' : 'none', // Hide the popup when no school is selected
        }}
      >
        {selectedSchool && (
          <div>
            <div><strong>{selectedSchool.get('name')}</strong></div>
            <div>{selectedSchool.get('address')}</div>
            <div>
              <button onClick={() => navigate(`/school/${selectedSchool.get('schoolID')}`)}>Go to page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MapComponent;
