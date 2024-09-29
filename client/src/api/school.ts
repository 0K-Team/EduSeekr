import axios from "axios";

export async function getSchoolData(rspo: string) {
    return await axios.get("/api/school/" + rspo);
}

export async function getAllSchools() {
    return await axios.get("/api/schools");
}

export async function getCKE(rspo: string) {
    return await axios.get("/api/cke/" + rspo);
}