import {Button, Grid, Paper, Typography} from '@mui/material'
import { Box } from '@mui/system'

export default function Intro(){
    return(
        <Paper elevation={0} variant='outlined' sx={{p:4}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant='h4' align='center'>Welcome to the Moonriver NFT Showcase</Typography>  
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subtitle1' align='center'>This app will allow you to see and share NFTs on Moonriver network</Typography>  
                </Grid>
                <Grid item xs={12} sm={2} sx={{display:'flex', flexDirection:'column'}}>
                    <Button size='small' variant='contained' href='https://metamask.io/' target='_blank' color={'warning'}>
                        Install Metamask
                    </Button>                
                </Grid>
                <Grid item xs={12} sm={2} sx={{display:'flex', flexDirection:'column'}}>
                    <Button size='small' variant='contained' href='https://docs.moonbeam.network/builders/get-started/networks/moonriver/#connect-metamask' target='_blank' color={'secondary'}>
                         Add to metamask
                    </Button>                
                </Grid>
                <Grid item xs={12}>
                </Grid>

            </Grid>
        </Paper>
    )
}