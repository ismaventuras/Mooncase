import { Button, Pagination, Stack, TextField } from "@mui/material";
import { useState } from "react";

const ControlledPagination = ({state, count}) => {    
    const {page, setPage, } = state
    const [value, setValue] = useState(page)

    const handleChange = (event, value) => {        
        setPage(value);
    }

    const onSearchChange = (e) => {
            setValue(e.target.value)
    }

    return(
        <Stack direction={'row'}>
            <Pagination count={count} page={page} onChange={handleChange} />
            <TextField size='small' value={value} onChange={onSearchChange} type={'number'} InputProps={{inputProps:{max:count, min:1}}}/>
            <Button onClick={(e) => {handleChange(e,parseInt(value))} }>Go to page</Button>
        </Stack>
    )
}

export default ControlledPagination