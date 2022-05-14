import {Grid,CircularProgress, Typography} from '@mui/material'

export default function Wait({message}){
    return(
        <Grid item xs={12} sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                <CircularProgress  />
                <Typography variant='overline'>{message}</Typography>
        </Grid>
    )
}