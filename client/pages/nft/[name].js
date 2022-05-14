import NFTDisplay from "../../src/components/NFTDisplay"
import { Typography } from "@mui/material"
import { findName } from "../../utils/NameSolverFunctions"
import { apiKey, covalentURI, chain } from '../../src/info'
import { covalent_GetNFTMetadata } from "../../utils/CovalentUtils"



export default function NFTByName({data}){

    return(
        <>
            {data && data.foundUser 
            ? <NFTDisplay data={data} /> 
            : <Typography align='center' variant='h4'>{data.name} not found</Typography>
            }
        </>
    )
}



export async function getServerSideProps(context) {    
    const nameToFind = context.params.name
    var data = {name: nameToFind}
    var found = await findName(nameToFind)
    
    
    if (found){
        var foundUser = {
            contract_address: found.contract_address,
            token_id: found.token_id.toNumber(),
            chain_id : found.chain_id.toNumber(),
            isValid: found.isValid,
            creator: found.creator
        }
        data.foundUser = foundUser
        
        //const endpoint = `${chain}/tokens/${found.contract_address}/nft_metadata/${found.token_id}/`
        var covalentData = await covalent_GetNFTMetadata(chain, found.contract_address, found.token_id)
        data.covalentData = covalentData
    }
    return {props:{ data }}
}