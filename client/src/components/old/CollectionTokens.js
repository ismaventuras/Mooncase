import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiKey, covalentURI, chain } from '../../info'
import { Grid, Typography, Paper, Container, Box, Button, CircularProgress } from "@mui/material"
import Wait from '../Wait'



export default function CollectionTokens({ contract_address }) {
    const router = useRouter()

    const [items, setItems] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    const endpoint = `${chain}/tokens/${contract_address}/nft_token_ids/`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(covalentURI + endpoint, { method: "GET", headers: { "Authorization": `BEARER ${apiKey}` } })
                const data = await res.json()
                setIsLoaded(true)
                setItems(data.data.items)
            }
            catch (error) {
                setIsLoaded(true)
                setError(error)
            }
        }
        if (contract_address) {
            fetchData()
        }
    }, [contract_address])

    const onClickView = (token_id, contract_address) => {
        router.push(
            {
                pathname: `/nft`,
                query: { token_id, contract_address }
            },
        )
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                {/* <Typography variant='h5' component='div' align='center' noWrap={true}>
                    Collection address: {contract_address ? contract_address : 'provide a contract address'}
                </Typography> */}
            </Grid>

            {items
                ? items.map(item => (
                    <Grid item key={item.token_id} xs={6} md={3}>
                        <Paper sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography align='center' sx={{ flexGrow: 1 }}>ID#{item.token_id}</Typography>
                            <Box>
                                <Button variant='outlined' onClick={() => onClickView(item.token_id, contract_address)}>View</Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))
                : <Wait message='loading contract data' />
            }
            {error && <Grid item xs={12} justifyContent='center' sx={{ textAlign: 'center' }}> <Typography color='red' variant='caption'> Error on fetch</Typography></Grid>}
        </Grid>

    )
}