import { useEffect, useState } from "react";
import "../styles/searchComponent.css"

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
    }, [])
    return (
        <div>
            <input type="text" className="search" defaultValue={value} autoFocus={focused} placeholder="Search..." onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key == "Enter" && setDataFunction(text)} />
        </div>
    )
}

export default SearchComponent;