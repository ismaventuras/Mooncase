import NFTDisplay from "../../../../src/components/NFTDisplay"
import { covalent_GetNFTMetadata } from "../../../../utils/CovalentUtils"
import { chain } from "../../../../src/info"

export default function TokenIdIndex({data}){
    
    return(
        <>
            <NFTDisplay data={data} /> 
        </>
    )
}

export async function getServerSideProps(context) {    
    const {contract_address, token_id} = context.params
    var data = {}
    
    var covalentData = await covalent_GetNFTMetadata(chain,contract_address,token_id)
    data.covalentData = covalentData

    return { props:{ data } }
}