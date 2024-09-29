import { useEffect, useState } from "react";
import "../styles/searchComponent.css"
import { TextField } from "@mui/material";

interface SearchComponentProps {
    setDataFunction: (value: string) => void;
    value?: string;
    focused?: boolean;
}

const SearchComponent = ({
    setDataFunction,
    value = "",
    focused = false
}: SearchComponentProps) => {
    const [text, setText] = useState("");
    useEffect(() => {
        setText(value);
    }, [value])
    return (
        <div>
            <TextField id="outlined-basic" className="search" defaultValue={value} autoFocus={focused} label="Nazwa szkoły" style={{background: 'white', width: '80%', marginLeft: '10%', border: "none", borderRadius: ".5em"}} placeholder='Na przykład "Technikum mechaniczne"...' variant="outlined" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key == "Enter" && setDataFunction(text)} />
        </div>
    )
}

export default SearchComponent;