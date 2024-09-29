import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MinimalSchool } from '../types/school';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Search } from "js-search"

const SchoolDropdown = ({ schools, setter }: { schools: MinimalSchool[], setter: (value: string) => void }) => {
    const [schoolsList, setSchoolsList] = useState<MinimalSchool[]>(schools);

    const search = new Search('rspo');
    search.addIndex("name");
    search.addDocuments(schools);

    useEffect(() => {
        setSchoolsList(schools);
    }, [schools]);

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Autocomplete
                disablePortal
                options={schoolsList.map(a => ({ label: a.name, id: a.rspo }))}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Wpisz nazwę szkoły" 
                        variant="outlined" 
                        fullWidth 
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{ ...params.InputProps, style: { fontSize: 20, padding: '10px 14px' } }}
                    />
                )}
                onInputChange={(_, value) => {
                    if (value) {
                        setSchoolsList(search.search(value) as MinimalSchool[]);
                    } else {
                        setSchoolsList(schools);
                    }
                }}
                onChange={(_, value) => setter(value ? value.id : "")}
            />
        </Box>
    );
}

export default SchoolDropdown;