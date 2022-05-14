export async function covalent_GetNFTMetadata(chain, contract_address, token_id){
    const endpoint = `${chain}/tokens/${contract_address}/nft_metadata/${token_id}/`
    try{
        const res = await fetch(
            process.env.COVALENT_URI + endpoint, 
            { 
                method: "GET", 
                headers: { "Authorization": `BEARER ${process.env.COVALENT_KEY}` } 
            }
        )
        const data = await res.json()
        return data.data.items[0]
    }   
    catch(err){
        return false
    }

}

export async function covalent_GetCollectionTokenIds(chain, contract_address) {
    const endpoint = `${chain}/tokens/${contract_address}/nft_token_ids/`
    try{
        const res = await fetch(
            process.env.COVALENT_URI + endpoint, 
            { 
                method: "GET", 
                headers: { "Authorization": `BEARER ${process.env.COVALENT_KEY}` } 
            }
        )
        const data = await res.json()
        return data.data.items
    }   
    catch(err){
        return false
    }
}
