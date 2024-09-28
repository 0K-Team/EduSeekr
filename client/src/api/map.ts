import axios from "axios";

export async function getNearSchools(point: [number, number], min: number, max: number) {
    return await axios.get("/api/map/proximity", {
        data: {
            coordinates: point,
            min,
            max
        }
    })
}

export async function fetchSchools() {
    return await axios.get("/api/map/minimal");
}