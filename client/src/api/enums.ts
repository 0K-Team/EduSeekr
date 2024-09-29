import axios from "axios";

export async function getMajors() {
    return await axios.get("/api/majors");
}

export async function getTypes() {
    return await axios.get("/api/type");
}