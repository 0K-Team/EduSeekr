import { Search } from "js-search";
import { fetchSchools, getNearSchools } from "../api/map"
import { getAllSchools } from "../api/school"
import { School } from "../types/school";

function removeDiacritics(string: string) {
    const mapping = {
        "ą": "a",
        "ć": "c",
        "ę": "e",
        "ó": "o",
        "ł": "l",
        "ń": "n",
        "ż": "z",
        "ź": "z",
        "ś": "s"
    }
    for (const key in mapping) {
        string = string.replace(new RegExp(key, "g"), mapping[key]);
    }
    return string;
}

const sanitizer = {
    sanitize: (text: string) => {
        return removeDiacritics(text.toLowerCase());
    }
}

export function search(searchString: string, schools: School[]) {
    const search = new Search("rspo");
    search.sanitizer = sanitizer;
    search.addIndex("name");
    search.addDocuments(schools);

    return search.search(searchString);
}

export function searchAllData(searchString: string, schools: School[]) {
    const search = new Search("rspo");
    search.sanitizer = sanitizer;
    search.addIndex("name");
    search.addIndex("shortName");
    search.addDocuments(schools);

    return search.search(searchString);
}

export async function searchByType(type: number) {
    const search = new Search("rspo");
    search.sanitizer = sanitizer;
    search.addIndex("type");
    search.addDocuments((await fetchSchools()).data);

    return search.search(type.toString());
}

export interface Filters {
    name: string;
    type: string[];
    majors: string[];
    city: string;
    distance: number;
}

export async function searchFull(filter: Filters, location?: [number, number] | []) {
    let schools = [];
    if (filter.distance > 0) {
        if (!location || location.length == 0) return [];
        schools = (await getNearSchools(location, 0, filter.distance)).data;
    } else {
        schools = (await getAllSchools()).data;
    }

    const search = new Search("rspo");
    search.sanitizer = sanitizer;
    search.addIndex("name");
    search.addIndex("shortName");
    search.addIndex("type");
    search.addIndex("majors");
    search.addIndex("address.city");
    search.addDocuments(schools);

    let results = schools;

    for (const key in filter) {
        if (key === "distance") continue;
        const f = filter[key];
        if (f.length === 0) continue;
        if (key === "city") {
            results = search.search(f);
        } else if (key === "type") {
            if (f.length === 0) continue;
            if (f[0].id == "0") continue;
            results = results.filter((school: School) => f.map(a => a.id).includes(school[key].toString()));
        } else if (key === "majors") {
            if (f.length === 0) continue;
            results = results.filter((school: School) => f.some(a => school[key].includes(a)));
        } else {
            results = search.search(f.toString());
        }
    }

    return results;
}
