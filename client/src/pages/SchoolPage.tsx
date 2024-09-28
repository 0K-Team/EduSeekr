import { useEffect, useState } from "react";
import { School } from "../types/school";
import { getSchoolData } from "../api/school";
import { useParams } from "react-router-dom";

export function SchoolPage() {
    const [school, setSchool] = useState<School | null>(null);
    const { rspo } = useParams();

    useEffect(() => {
        getSchoolData(rspo ?? "")
        .then(({data}) => {
            setSchool(data);
        })
    })

    return school ? (
        <div>
            <p>RSPO: {school.rspo}</p>
            <p>Typ: {school.type}</p>
            <p>Nazwa: {school.name}</p>
            <p>Krotka nazwa: {school.shortName}</p>
            <p>Przedmioty zawodowe: <br /> {school.majors.join("\n")}</p>
            <p>Strona: {school.website}</p>
            <p>Telefon: {school.phone}</p>
            <p>Email: {school.email}</p>
            <p>Dyrektor imie: {school.principalName}</p>
            <p>Dyrektor nazwisko: {school.principalSurname}</p>
            <p>Internat: {school.internat ? "Tak" : "Nie"}</p>
        </div>
    ) : (
        <h1>Invalid RSPO: {rspo}</h1>
    ); 
}