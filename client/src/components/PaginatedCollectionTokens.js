import { useRouter } from 'next/router'
import { useEffect, useState , } from 'react'
import { Grid, Container,Chip } from "@mui/material"
import ControlledPagination from './ControlledPagination'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';


const TokenIdBox = ({element}) => {
    const router = useRouter()
    const onClickView = () => {
        router.push({pathname: `/collection/${element.contract_address}/${element.token_id}`, })
    }
    
    return(
        <Chip label={`#${element.token_id}`} color={'default'} icon={<ZoomOutMapIcon/>}  onClick={onClickView} />
    )
}

export default function PaginatedTokens({data}){
    const [page, setPage] = useState(1)
    const totalItems = data.length    
    const itemsPerPage = 48
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
                <Grid item xs={12} sx={{height:'100%'}}>
                    <ControlledPagination count={pages} state={{page,setPage}} />
                </Grid>
                {items.map(element => (
                        <Grid item xs={3} sm={1} key={element.token_id}>
                            <TokenIdBox element={element} />
                        </Grid>
                ))
                }
            </Grid>
        </Container>
    )
}
