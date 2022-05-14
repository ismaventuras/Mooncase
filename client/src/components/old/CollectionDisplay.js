import Image from 'next/image'
import { useEffect, useState } from 'react'
import { apiKey, covalentURI, chain } from '../../info'
import Link from 'next/link'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Wait from '../Wait'
const endpoint = `${chain}/nft_market/`

function CollectionItem({ element }) {
    const router = useRouter()
    const onClickTokensButton = (collection_address) => {
        router.push(`/collection?contract_address=${collection_address}`)
    }

    return (
        <Card sx={{ maxWidth: 256 }}>
            <CardContent>
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary={element.collection_name}
                            secondary={'Collection Name'}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={
                                <Link underline='hover' href={`/collection/${element.collection_address}`}>
                                    {element.collection_address}
                                </Link>
                            }
                            primaryTypographyProps={{ noWrap: true }}
                            secondary={"Collection address"}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={element.market_cap_quote}
                            secondary={'Marketcap'}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={element.max_price_quote}
                            secondary={"Max price"}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Button onClick={() => onClickTokensButton(element.collection_address)} sx={{ mx: 'auto' }}>TOKENS</Button>
            </CardActions>
        </Card>
    )
}

export default function CollectionsDisplay() {
    const [items, setItems] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

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

        fetchData()
    }, [])
    return (
        <Container>
            <Grid container spacing={2} justifyContent='center'>
                {error && <Grid item>{error}</Grid>}
                {isLoaded ? items.map(element => (
                    <Grid item key={element.collection_address}>
                        <CollectionItem element={element} />
                    </Grid>
                ))
                : <Wait message={'Loading Collections'}/>
                }
            </Grid>
        </Container>
    )
}