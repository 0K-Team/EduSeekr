import { Search } from "js-search";
import { fetchSchools } from "../api/map"
import { getAllSchools } from "../api/school"

export function search(searchString: string, schools: MinimalSchool[]) {
    const search = new Search("rspo");
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