import Image from 'next/image'
import { useEffect, useState } from 'react'
import { apiKey, covalentURI, chain } from '../../info'
import Link from 'next/link'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, List, ListItem, ListItemText, Pagination, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'


const endpoint = `${chain}/nft_market/`

const ControlledPagination = ({state, count}) => {
    const {page, setPage, } = state
    const handleChange = (event, value) => {        
        setPage(value);
    }

    return(
        <Stack>
            <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
    )
}

function CollectionItem({ element }) {
    const router = useRouter()
    const onClickTokensButton = (collection_address) => {
        router.push(`/collection?contract_address=${collection_address}`)
    }

    return (
        <Card sx={{}}>
            {/* <CardMedia sx={{maxWidth:512}}> */}
                {/* <Image alt='' height={256} width={256} src={element.first_nft_image_256} /> */}
                {/* <img alt=''  src={element.first_nft_image} width={256} height={256}/> */}
            {/* </CardMedia>  */}
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='overline' component='div' fontSize={16}>{element.collection_name}</Typography>
                <Typography variant='caption' component='div'>Market cap: {element.market_cap_quote}</Typography>
            </CardContent>
            {/* <CardActions>
                <Button onClick={() => onClickTokensButton(element.collection_address)} sx={{ mx: 'auto' }}>TOKENS</Button>
            </CardActions> */}
        </Card>
    )
}

function PaginatedCollections({data}){
    const [page, setPage] = useState(1)
    const totalItems = data.length    
    const itemsPerPage = 3
    const totalPages = (totalItems / itemsPerPage)
    const pages = (totalPages - Math.floor(totalPages) !== 0) ? Math.floor(totalPages)+1 : totalPages
    const [items, setItems] = useState([])

    useEffect(()=>{        
        let offset = (page-1) * itemsPerPage
        let limit = itemsPerPage * page
        let slicedItems = data ? data.slice(offset, limit) : []    
        setItems(slicedItems)
     },[page, data])

    return(
        <Container >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ControlledPagination count={pages} state={{page,setPage}} />
                </Grid>
                {items.length > 0 && items.map(element => (
                    <Grid item xs={12} sm={4} key={element.collection_address}>
                        <CollectionItem element={element} />
                    </Grid>

                ))}
            </Grid>
        </Container>
    )
}

export default function PaginatedCovalentCollections(){    
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(covalentURI + endpoint, { method: "GET", headers: { "Authorization": `BEARER ${apiKey}` } })
                const data = await res.json()
                setIsLoaded(true)
                setData(data.data.items)
            }
            catch (error) {
                setIsLoaded(true)
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return(
        <>
            {data ? <PaginatedCollections  data={data}/> : 'Loading collections...'}
        </>
    )
}