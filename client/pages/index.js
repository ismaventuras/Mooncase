import {  Grid,  } from '@mui/material'
import SearchContract from '../src/components/SearchContract'
import CustomCollections from '../src/components/CustomCollections'
import Intro from '../src/components/Intro'

export default function Home() {


  return (
    <>

        <Grid container spacing={3}>          
          <Grid item xs={12}>
            <Intro />
          </Grid>          
          <Grid item xs={12}>
            <SearchContract />
          </Grid>          
          <Grid item xs={12}>
            <CustomCollections />
          </Grid>
        </Grid>
    </>
  )
}
