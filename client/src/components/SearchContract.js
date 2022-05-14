import { Alert, Grid, IconButton, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import {useRouter} from "next/router"
import SearchIcon from '@mui/icons-material/Search';
import { findName, getEvents } from "../../utils/NameSolverFunctions";
import { isNFT } from "../../utils/ContractUtils";

export default function SearchContract(){
    const router = useRouter()
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)

    const onChange = (e) => {     
        setError('')   
        setValue(e.target.value)
    }


    const onClick = async (e) => {
        // if value is an address then check if is an NFT, if not, then check if its a registered name
        if(ethers.utils.isAddress(value)){
            const isNft = await isNFT(value)
            if(isNft)router.push({pathname: `/collection/${value}`,})
            else setError('Not an ERC721 or ERC1155 address')            
        }
        else{
            const exists = await findName(value)
            if(exists) router.push({pathname: `/nft/${value}`,})            
            else setError('Not an ERC721 or ERC1155 address or NFT name not found')            
        }
    }


    return(
        <>
            <Grid container  spacing={1} sx={{mx:'auto'}}>
                <Grid item xs={11}>
                    <TextField 
                    // error={error ? true : false}             
                    // helperText={error}   
                    label={''}
                    fullWidth
                    placeholder={'Search for a collection address or a NFT Name '}
                    value={value}
                    onChange={onChange}
                    />
                </Grid>            
                <Grid item xs={1} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>                
                    <IconButton onClick={onClick} disabled={!value}>
                        <SearchIcon />
                    </IconButton>
                </Grid>            
                <Grid item xs={12}>
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>                            
            </Grid>
        </>
    )
}