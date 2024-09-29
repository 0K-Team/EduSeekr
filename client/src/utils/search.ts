import { Search } from "js-search";
import { fetchSchools, getNearSchools } from "../api/map"
import { getAllSchools } from "../api/school"

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
        return removeDiacritics(text);
    }
}

export function search(searchString: string, schools: MinimalSchool[]) {
    const search = new Search("rspo");
    search.sanitizer = sanitizer;
    search.addIndex("name");
    search.addDocuments(schools);

    return search.search(searchString);
}

export function searchAllData(searchString: string, schools: School[]) {
    const search = new Search("rspo");
    search.addIndex("name");
    search.addIndex("shortName");
    search.addDocuments(schools);

    return search.search(searchString);
}

export async function searchByType(type: number) {
    const search = new Search("rspo");
    search.addIndex("type");
    search.addDocuments((await fetchSchools()).data);

    return search.search(type);
}

export interface Filters {
    name: string;
    type: number[];
    majors: string[];
    city: string;
    distance: number;
}

export async function searchFull(filter: Filters, location?: [number, number]) {
    let schools = [];
    if (filter.distance > 0) {
        if (!location || location.length == 0) return [];
        schools = await getNearSchools(location, 0, filter.distance);
    } else {
        schools = await getAllSchools();
    }

    let search = new Search("rspo");
    search.addDocuments((await fetchSchools()).data);

    for (const key in filter) {
        if (key == "distance") continue;
        const f = filter[key];
        if (key == "city") {
            search.addIndex(`address.${key}`);
            const temp = new Search("rspo");
            temp.addDocuments(search.search(f));
            search = temp;
        } else {
            search.addIndex(key);
            const temp = new Search("rspo");
            temp.addDocuments(search.search(f));
            search = temp;
        }
    }
    return search.search("");
}