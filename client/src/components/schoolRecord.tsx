import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { School } from "../types/school";

const SchoolRecord = ({school}: {school: School}) => {
    return (
        <div style={{width: '100%', border: '1px solid black', padding: '1em'}}>
            <p>{school.rspo}</p>
            <h2>{school.shortName ?? school.name}</h2>
            <p>{school.majors}</p>
            <p>Internat: {school.internat ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
            <p>{`${school.address.city} ${school.address.street} ${school.address.building}` + (school.address.apartment != null ? `/${school.address.apartment}` : "" + ` ${school.address.postal}`)}</p>
            <a href={school.website}>{school.website}</a>
        </div>
    )
}

export default SchoolRecord;