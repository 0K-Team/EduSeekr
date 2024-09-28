import React, { useState } from 'react';
import SearchBox from './CompareSearchBox.tsx';
import SchoolBox from './CompareSchoolBox.tsx';
import { School } from "../types/school"

interface SchoolData {
    school: School;
}

const SchoolComparison: React.FC = () => {
  const [school1, setSchool1] = useState<SchoolData | null>(null);
  const [school2, setSchool2] = useState<SchoolData | null>(null);

  const handleSchool1Select = (school: SchoolData) => {
    setSchool1(school);
  };

  const handleSchool2Select = (school: SchoolData) => {
    setSchool2(school);
  };

  return (
    <div className="comparison-container">
      <div className="school-container">
        <SearchBox onSelectSchool={handleSchool1Select} />
        {school1 && <SchoolBox school={school1} />}
      </div>
      <div className="school-container">
        <SearchBox onSelectSchool={handleSchool2Select} />
        {school2 && <SchoolBox school={school2} />}
      </div>
    </div>
  );
};

export default SchoolComparison;
