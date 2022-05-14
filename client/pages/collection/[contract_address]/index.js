import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { apiKey, covalentURI , chain} from "../../../src/info"
import Head from "next/head"
import { Divider, Grid, Paper, Typography } from "@mui/material"
import Wait from "../../../src/components/Wait"
import PaginatedTokens from "../../../src/components/PaginatedCollectionTokens"
import { covalent_GetCollectionTokenIds, covalent_GetNFTMetadata } from "../../../utils/CovalentUtils"


function CollectionInfo({data}){
    return(
        <Paper sx={{padding:1}}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <Typography variant='subtitle1' align='center'>Address</Typography>
                    <Typography variant='subtitle2' align='center'>{data.contract_address}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant='subtitle1' align='center'>Collection Name</Typography>
                    <Typography variant='subtitle2' align='center'>{data.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant='subtitle1' align='center'>Ticker Symbol</Typography>
                    <Typography variant='subtitle2' align='center'>{data.symbol}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}


export default function Collection({data}) {

    const {covalentData, contractInfo, contract_address} = data

    return (
        <>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    {contractInfo ? <CollectionInfo  data={contractInfo}/> : <Wait message={'loading data'}/>}
                </Grid>
                <Grid item xs={12}>
                    <PaginatedTokens  data={covalentData}/>
                </Grid>
            </Grid>
        </>
    )
}

export async function getServerSideProps(context) {    
    const {contract_address} = context.params
    var data = {contract_address:contract_address}    
    var covalentData = await covalent_GetCollectionTokenIds(chain, contract_address)
    data.covalentData = covalentData
    data.contractInfo = {
        contract_address: covalentData[0].contract_address, 
        name:covalentData[0].contract_name, 
        symbol:covalentData[0].contract_ticker_symbol,
        logo_url: covalentData[0].logo_url
    }

    return { props:{ data } }
}