import axios from "axios";

export async function getSchoolData(rspo: string) {
    return await axios.get("/api/school/" + rspo);
}