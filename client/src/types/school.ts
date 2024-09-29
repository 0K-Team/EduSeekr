export enum Type {
    LICEUM_OGOLNOKSZTALCACE = 14,
    LICEUM_PROFILOWANE = 15,
    TECHNIKUM = 16,
    LICEUM_OGOLNOKSZTALCACE_UZUPELNIAJACE_DLA_ABSOLWENTOW_ZASADNICZYCH_SZKOL_ZAWODOWYCH = 17,
    SZKOLA_SPECJALNA_PRZYSPOSABIAJACA_DO_PRACY = 20,
    OGOLNOKSZTALCACA_SZKOLA_MUZYCZNA_II_STOPNIA = 24,
    OGOLNOKSZTALCACA_SZKOLA_SZTUK_PIEKNYCH = 26,
    LICEUM_SZTUK_PLASTYCZNYCH = 27,
    OGOLNOKSZTALCACA_SZKOLA_BALETOWA = 29,
    SZKOLA_SZTUKI_CYRKOWEJ = 31,
    SZKOLA_MUZYCZNA_II_STOPNIA = 86,
    BRANZOWA_SZKOLA_I_STOPNIA = 93,
    BRANZOWA_SZKOLA_II_STOPNIA = 94,
    BRANZOWE_CENTRUM_UMIEJETNOSCI = 97
}

export interface School {
    rspo: string;
    type: Type;
    name: string;
    shortName: string;
    majors: string[];      //kierunki
    location: {
        type: "Point",
        coordinates: [number, number]
    };
    website: string;
    phone: string;
    email: string;
    principalName: string;
    principalSurname: string;
    internat: boolean;
    address: {
        city: string;
        street: string;
        building: string;
        apartment: string;
        postal: string;
    };
    city: string;
    polish: {
        written: number,
        oral: number
    };
    english: {
        written: number,
        oral: number
    };
    math: number;
}

export interface MinimalSchool {
    rspo: string;
    type: Type;
    name: string;
    location: {
        type: "Point",
        coordinates: [number, number]
    };
}