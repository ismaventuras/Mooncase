import Image from "next/image"
import { Card, CardHeader,  Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import Wait from "./Wait"
import { Box } from "@mui/system"
import NameForm from "./NameForm"
import { useState } from "react"
import { placeHolderUrl } from "../info"


const QueryInfo = ({ contract_address, token_id }) => {
    return (
        <Paper sx={{p:1, }} elevation={8}>            
            <Box>
                <Typography variant='body2'>Contract address : {contract_address}</Typography>
                <Typography variant='body2'>Token id: {token_id}</Typography>
            </Box>                
        </Paper>
    )
}

function NFTData({nftInfo}){    
    return(
        <Paper sx={{p:2}} elevation={24}>            
            <Typography align='center' variant='h6'>Onchain data</Typography>
            <Divider variant='middle'/>
            <List>
                <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={nftInfo.nft_data[0].owner}
                        secondary={'Owner'}
                        primaryTypographyProps={{ overflow: 'auto' , fontSize:{xs:14,sm:16}}}
                    />
                </ListItem>
                <Divider variant='middle'/>
                <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={nftInfo.nft_data[0].original_owner}
                        secondary={'Original owner'}
                        primaryTypographyProps={{ overflow: 'auto' , fontSize:{xs:14,sm:16}}}
                    />
                </ListItem>
                <Divider variant='middle'/>
                <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={nftInfo.nft_data[0].burned ? 'Yes' : 'No'}
                        secondary={'Burned?'}
                        primaryTypographyProps={{ overflow: 'auto' }}
                    />
                </ListItem>
                <Divider />
                <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={nftInfo.contract_name}
                        secondary={'CONTRACT NAME'}
                    />
                </ListItem>
                <Divider variant='middle'/>
                <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={nftInfo.contract_ticker_symbol}
                        secondary={'Ticker Symbol'}
                    />
                </ListItem>
                <Divider variant='middle'/>
                <ListItem sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary={nftInfo.contract_address}
                        secondary={'contract address'}
                        primaryTypographyProps={{ overflow: 'auto' }}
                    />
                </ListItem>
            </List>
        </Paper>
    )
}

function ImageBox({src}){
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    return(
        <Paper elevation={24} sx={{p:2,display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box>
                {loaded ? null : (<Wait message={'fetching image from IPFS...'}/>)}                
                <Image 
                    alt="nft logo" 
                    src={error ? placeHolderUrl : src} 
                    width={512} height={512} 
                    onLoad={() => setLoaded(true)} 
                    placeholder="blur"
                    blurDataURL={placeHolderUrl}
                    />
            </Box>
        </Paper>
    )
}

function NFTAttributes({attributes}){
    return(
        <>
            <Paper sx={{p:2}} elevation={24}>
            <Typography variant='h6' >attributes</Typography>
            {attributes
            ? 

                <Grid container  spacing={2}>
                {
                    attributes.map(trait => {     
                        if(trait.value){                   
                            return(
                            <Grid item key={`${trait.trait_type}-${trait.value}`} xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        title={trait.value}
                                        subheader={trait.trait_type}
                                        titleTypographyProps={{variant:'body1', align:'center'}}
                                        subheaderTypographyProps={{variant:'body2',align:'center'}}
                                    />
                                </Card>
                            </Grid>
                            )
                        }
                })
                        
                }
                </Grid>
            : <Typography variant='h6'>No attributes</Typography>
            }
            </Paper>
        </>
    )
}

export default function NFTDisplay({data}) {
    const {name, covalentData, foundUser} = data
    const token_id = covalentData.nft_data ? covalentData.nft_data[0].token_id : ''
    const contract_address = covalentData.contract_address

    return (
        <>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <QueryInfo token_id={token_id} contract_address={contract_address} />                        
                    </Grid>
                    {covalentData.nft_data ?
                    <>
                        <Grid item xs={12}>
                            <NameForm token_id={token_id} contract_address={contract_address} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <NFTData nftInfo={covalentData}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>                            
                            <ImageBox src={covalentData.nft_data[0].external_data.image_1024}/>
                        </Grid>
                        <Grid item xs={12} >
                            <NFTAttributes attributes={covalentData.nft_data[0].external_data.attributes}/>
                        </Grid>
                        </>
                    : <Wait message={'loading nft data'} />
                        
                    }

                </Grid>
        </>
    )
}