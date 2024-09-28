const handleSearch = async () => {
  try {
    const response = await fetch(`/api/schools?search=${query}`); // Zakładamy, że masz endpoint do wyszukiwania szkół
    if (!response.ok) {
      throw new Error('Failed to fetch school data');
    }

    const schoolData = await response.json(); // Zakładamy, że dane z API mogą być niepełne

    // Ręczne uzupełnienie brakujących pól (przykład z domyślnymi wartościami)
    const school: School = {
      rspo: schoolData.rspo || 'Brak danych',  // Domyślna wartość, jeśli brakuje
      type: schoolData.type || 'Unknown',      // Ręczne ustawienie typu
      name: schoolData.name || 'Brak nazwy',
      shortName: schoolData.shortName || 'Brak skrótu',
      professions: schoolData.professions || [], // Pusta tablica jeśli brak zawodów
      location: schoolData.location || {
        type: 'Point',
        coordinates: [0, 0], // Domyślne współrzędne, jeśli brak danych
      },
      website: schoolData.website || 'Brak strony',
      phone: schoolData.phone || 'Brak telefonu',
      email: schoolData.email || 'Brak emaila',
      principalName: schoolData.principalName || 'Brak imienia dyrektora',
      principalSurname: schoolData.principalSurname || 'Brak nazwiska dyrektora',
      internat: schoolData.internat || false, // Domyślna wartość false jeśli brak danych
    };

    onSelectSchool(school); // Przekazujemy poprawiony obiekt do komponentu nadrzędnego
    setError(null); // Resetowanie błędu, jeśli wystąpił wcześniej
  } catch (error) {
    setError('Nie udało się pobrać danych szkoły.');
    console.error('Błąd:', error);
  }
};


export default SearchBox;