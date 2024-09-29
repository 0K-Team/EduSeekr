import { School } from "../types/school";
import '../styles/schoolRecord.css';

const SchoolRecord = ({school}: {school: School}) => {
    return (
        <div style={{width: '100%', backgroundColor: "#1a618a", color: "#ffffff", marginBottom: "1em", borderRadius: "1em", padding: '1em'}}>
            <span className="schoolRecord-title">{school.shortName ?? school.name}</span>
            <span className="schoolRecord-id"> ({school.rspo})</span>
            <p>{school.majors.join(", ")}</p>
            {/* <p>Internat: {school.internat ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p> */}
            {/* <p>{`${school.address.city} ${school.address.street} ${school.address.building}` + (school.address.apartment != null ? `/${school.address.apartment}` : "" + ` ${school.address.postal}`)}</p> */}
            {/* <a href={`https://${school.website}`}>{school.website}</a> */}
        </div>
    )
}

export default SchoolRecord;