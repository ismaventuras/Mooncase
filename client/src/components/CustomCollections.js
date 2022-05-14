import { Card, CardActions, CardHeader, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getNFTData } from '../../utils/ContractUtils'
import {popularCollectionsAddresses}  from '../info'
import ControlledPagination from './ControlledPagination'
import Wait from './Wait'
import LaunchIcon from '@mui/icons-material/Launch';
import { useRouter } from 'next/router'


function CustomCollection({address}){
    const router = useRouter()

    const [name, setName] = useState('')
    const [symbol, setSymbol] = useState('')
    const [isLoaded, setIsLoaded] = useState(null)

    useEffect(()=>{
        const doSomething = async () => {
            try{
                const nftData = await getNFTData(address)
                setName(nftData.name)
                setSymbol(nftData.symbol)
                setIsLoaded(true)
            }
            catch(err){
                console.log(err)
            }
        }
        doSomething()
    },[address])

    const onClick = (e) => {
        router.push({pathname:`/collection/${address}`})
    }

    return(        
        <Card>
            {isLoaded ? 
            <>
                <CardHeader
                    title={name}
                    subheader={address}
                    subheaderTypographyProps={{fontSize:{xs:12,sm:12}}}                    
                    titleTypographyProps={{fontSize:{xs:14, sm:16}}}
                    action={
                        <IconButton sx={{my:2}} onClick={onClick}>
                            <LaunchIcon />
                        </IconButton>
                    }
                    sx={{justifyContent:'center'}}
                />
            </>
            : <Wait message={'loading collection data'} />
            }
        </Card>
    )
}

export default function CustomCollections(){
    const data = popularCollectionsAddresses
    const [page, setPage] = useState(1)
    const totalItems = data.length    
    const itemsPerPage = 9
    const totalPages = (totalItems / itemsPerPage)
    const pages = (totalPages - Math.floor(totalPages) !== 0) ? Math.floor(totalPages)+1 : totalPages
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(null)

    useEffect(()=>{        
        setIsLoading(true)
        let offset = (page-1) * itemsPerPage
        let limit = itemsPerPage * page
        let slicedItems = data ? data.slice(offset, limit) : []    
        setItems(slicedItems)
        setIsLoading(false)
    },[page])

    return(
        <Paper sx={{p:2}} elevation={22}>
            <Grid container spacing={1}>                
                <Grid item xs={12} sx={{height:'100%', display:'flex', justifyContent:'center'}}>
                    <Typography align='center' variant='h6'>Popular ERC721 </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ControlledPagination count={pages} state={{page,setPage}} />
                </Grid>
                {items.map(address => (
                    <Grid item key={address} xs={12} sm={12} md={4}>
                        <CustomCollection address={address} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}