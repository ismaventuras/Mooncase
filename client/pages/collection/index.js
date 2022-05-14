import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";


export default function Index(){
    return(
        <Box sx={{}}>
            <Typography> Please use the search bar on the homepage or click on any of the popular collecions</Typography>
            <Link href='/'>Back home</Link>
        </Box>
    )
}