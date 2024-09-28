import React from 'react';
import { School } from "../types/school"

interface SchoolBoxProps {
  school: School;
}

const SchoolBox: React.FC<SchoolBoxProps> = ({ school }) => {
  return (
    <div className="school-box">
      <h2>{school.name}</h2>
      <p><strong>Adres:</strong> {school.address}</p>
      <p><strong>Ranking:</strong> {school.ranking}</p>
      <p><strong>Liczba uczniów:</strong> {school.students}</p>
      <p><strong>Opis:</strong> {school.description}</p>
    </div>
  );
};

export default SchoolBox;
