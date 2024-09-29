import React, { useEffect, useState } from 'react';
import { MinimalSchool, School } from '../types/school'; // Import interfejsu School
import '../styles/Compare.css';
import { getSchoolData } from '../api/school';
import { fetchSchools } from "../api/map";
import SchoolDropdown from '../components/SchoolDropdown';

const SchoolComparison: React.FC = () => {
  const [school1, setSchool1] = useState<School | null>(null);
  const [school2, setSchool2] = useState<School | null>(null);

  const [allSchools, setAllSchools] = useState<MinimalSchool[]>([]);

  useEffect(() => {
    fetchSchools()
    .then(({data}) => {
      setAllSchools(data);
    })
  }, [])

  // Funkcje obsługujące wybór szkół
  const handleSelectSchool1 = async (rspo: string) => {
    if (!rspo) return;
    setSchool1((await getSchoolData(rspo)).data);
  };

  const handleSelectSchool2 = async (rspo: string) => {
    if (!rspo) return;
    setSchool2((await getSchoolData(rspo)).data);
  };

  return (
    <div className="school-comparison" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="porownaj" >Porównaj Szkoły</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '2em' }}>
      {/* Komponent wyszukiwania szkoły 1 */}
      <div className="school-search" style={{ flex: 1, marginRight: '1em' }}>
        <h3 className = "h3" id = 'pierwszaSzkoła' style={{ textAlign: 'center' }}>Wybierz pierwszą szkołę</h3>
        <div>
          <SchoolDropdown setter={handleSelectSchool1} schools={allSchools} />
        </div>
      </div>

      {/* Komponent wyszukiwania szkoły 2 */}
      <div className="school-search" style={{ flex: 1, marginLeft: '1em' }}>
        <h3 className = "h3" style={{ textAlign: 'center' }}>Wybierz drugą szkołę</h3>
        <div>
          <SchoolDropdown setter={handleSelectSchool2} schools={allSchools} />
        </div>
      </div>
      </div>

      {/* Wyświetlanie porównywanych szkół */}
      <div className="school-comparison-boxes" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      {/* Wyświetlanie pierwszej szkoły */}
      {school1 && (
        <div className="school-box" style={{ flex: 1, marginRight: '1em', padding: '1em', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h4 className = "h4" >{school1.name}</h4>
        <p>Typ: {school1.type}</p>
        <p>Internat: {school1.internat ? 'Tak' : 'Nie'}</p>
        <p>Kierunki: {school1.majors?.join(', ') ?? "Brak danych"}</p>
        <p>Wyniki matur:</p>
        <ul>
          <li>Polski: {school1.examResults?.polski || 'Brak danych'}</li>
          <li>Angielski: {school1.examResults?.angielski || 'Brak danych'}</li>
          <li>Matematyka: {school1.examResults?.matematyka || 'Brak danych'}</li>
        </ul>
        </div>
      )}

      {/* Wyświetlanie drugiej szkoły */}
      {school2 && (
        <div className="school-box" style={{ flex: 1, marginLeft: '1em', padding: '1em', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h4 className="h4">{school2.name}</h4>
        <p>Typ: {school2.type}</p>
        <p>Internat: {school2.internat ? 'Tak' : 'Nie'}</p>
        <p>Kierunki: {school2.majors?.join(', ') ?? "Brak danych"}</p>
        <p>Wyniki matur:</p>
        <ul>
          <li>Polski: {school2.examResults?.polski || 'Brak danych'}</li>
          <li>Angielski: {school2.examResults?.angielski || 'Brak danych'}</li>
          <li>Matematyka: {school2.examResults?.matematyka || 'Brak danych'}</li>
        </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default SchoolComparison;
