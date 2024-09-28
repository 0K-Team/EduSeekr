import levenshtein from "fast-levenshtein";
import { fetchSchools } from "../api/map";

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

export async function search(searchString: string) {
    const schools: Map<[string, string]> = new Map((await fetchSchools().data).map(a => [removeDiacritics(a.name.toLowerCase()), a.rspo]));
    if (schools.has(removeDiacritics(searchString))) return schools.get(removeDiacritics(searchString));
    const filter1 = schools.keys().filter(s => s.includes(searchString));
    if (filter1.length > 0) return filter1.map(f => schools.get(f));
    
}