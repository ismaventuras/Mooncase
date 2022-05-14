import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material"
import Wait from "./Wait"
import { Box } from "@mui/system"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core";
import { createName } from "../../utils/NameSolverFunctions"
import CloseIcon from '@mui/icons-material/Close';
import {MetamaskButton} from './Layout'
import MUILink from '../materialui/Link'
import { blockExplorerUrl , siteUrl } from "../info"

function ControlledTextField({value,setValue}){
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return(
        <TextField
        autoFocus
        margin='dense'
        id='name'
        label='link name'
        type='text'
        fullWidth
        variant='standard'
        value={value}
        onChange={onChange}
        required
    />
    )
}

export default function NameForm({contract_address, token_id}) {
    const {active, library} = useWeb3React()
    const [open, setOpen] = useState(false);    
    const [name,setName] = useState('')
    const [txHash,setTxHash] = useState('')
    const [confirmedTx, setConfirmedTx] = useState(null)
    const [sending, setSending] = useState(false)
    const [done, setDone] = useState(null)
    const [error, setError] = useState(null)

    const clear = () => {
        setName('')
        setError('')
        setSending(null)
        setTxHash(null)
        setDone(null)
    }

    const onSendTransaction = async (e) => {
        if(!name) {
            setError('name is required')
            return
        }
        setError('')
        e.preventDefault()
        try{
            setSending(true)
            // createName returns the tx or an error
            var {tx, error} = await createName(contract_address, token_id, 1285, name ,library.getSigner())
            if(tx){
                setTxHash(tx.hash)
                let receipt = await tx.wait()
                setConfirmedTx(receipt)
                console.log(receipt)                
                setDone(true)
            }else{
                switch(error.code){
                    case 4001: 
                        setError(error.message)
                        break
                    default:
                        setError(error.data.message)
                        break
                }
            }
            setSending(false)
        }
        catch(err){
            setSending(false)
            console.log(err)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if(reason && reason == "backdropClick") return
        setOpen(false);        
        clear()
    };

    return (
        <Box>
            <Button onClick={handleClickOpen}>Create a unique link for this NFT</Button>

            <Dialog onClose={handleClose} open={open} fullWidth>    
            <DialogTitle sx={{display:'flex', justifyContent:'space-between', alignItems:'center', p:1}} variant='overline'>
                Create a unique link for this NFT
                <IconButton  color={'inherit'} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>                                
            <Divider/>
                {
                    done ?
                    <>
                    <DialogContent sx={{textAlign:'center', }}>
                        <Typography variant='overline' align='center' component={'div'}>Your link is now accessible via </Typography>
                        <MUILink as={<Link/>} href={`${siteUrl}nft/${name}`} target="_blank" >
                            <Box>
                                <Typography fontSize={14} variant='overline'>
                                {siteUrl}nft/{name}                             
                                </Typography>
                            </Box>
                        </MUILink>
                    </DialogContent>
                    <Divider/>
                    <DialogActions sx={{textAlign:'center', margin:'auto'}}>
                        <Button onClick={() => {navigator.clipboard.writeText(`${siteUrl}nft/${name}`)}}>Copy to clipboard</Button>
                        <Button href={`${blockExplorerUrl}/tx/${txHash}`} target="_blank">Check transaction on block explorer</Button>
                    </DialogActions>
                    </>
                    :
                    <>
                        <DialogContent>     
                            {sending ?
                                <Wait message={'waiting for transaction...'} />
                                : 
                                <>
                                <DialogContentText>
                                    Create a unique link like {siteUrl}nft/MyName
                                </DialogContentText>
                                <ControlledTextField  value={name} setValue={setName}/>                 
                                <DialogContentText color={'red'}>
                                    {error}
                                </DialogContentText>                                                
                                </>
                            }               
                        </DialogContent>
                        <Divider/>
                        <DialogActions>
                            <MetamaskButton />
                            <Button onClick={onSendTransaction} disabled={!active}>
                                Sign transaction
                            </Button>
                        </DialogActions>
                    </>
                }                            
            </Dialog>
        </Box>
    )
}