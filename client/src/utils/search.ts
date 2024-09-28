import { Search } from "js-search";
import { fetchSchools } from "../api/map"

export function search(searchString: string) {
    const search = new Search("rspo");
    search.addIndex("name");
    search.addDocuments((await fetchSchools()).data);

    return search.search(searchString);
}