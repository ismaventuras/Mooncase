import { Container, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MuiLink from "../src/materialui/Link";

export default function About(){
    return(
        <Container sx={{display:'flex', flexWrap:'wrap', gap:1}}>
            <Typography variant='h4' textTransform={'uppercase'}>
                About the project
            </Typography>
            
            <Typography variant='body1' align='justify'>
            Mooncase is a project made for the DoraHacks and the Moonbeam Foundation hackathon  with the intention of creating a web application to display and share NFTs created on the Moonriver network.<br/>
            This app has a search bar to find a collection by its address or a NFT by its registered name.
            In order to register names, the user must have installed an injected walletd like MetaMask, have the Moonriver network configured and at least 0.003 MOVR (subject to change depending on network congestion) to pay for the transaction fees to create the  association between the name and the NFT in the blockchain.
            <br/>
            The project consists of a web application using React (NextJs) , MaterialUI , etherjs and data from the Covalenthq api.
            </Typography>
            <Typography variant='h4' textTransform={'uppercase'}>
                About me
            </Typography>
            <Typography variant='body1' align='justify'>
            My name is Ismael and apart from working as a computer scientist and developer I like to study and develop on blockchain in my free time. I usually create web applications, backends and Smart Contracts using JavaScript, Python and Solidity. Right now Im in the process of learning more about Substrate, Rust, XCM , EWASM, and Polkadot in general.
            </Typography>
            
            <Box sx={{display:'flex', flexDirection:'column', gap:1, flexWrap:'wrap'}}>
                <Typography component={'div'} variant='h4' textTransform={'uppercase'}>Links</Typography>            
                <MuiLink href='https://dorahacks.io/grant/moonriver/detail' target="_blank">
                    Dorahacks
                </MuiLink>
                <MuiLink href='https://moonbeam.foundation/' target="_blank">
                    Moonbeam Foundation
                </MuiLink>
                <MuiLink href='https://github.com/ismaventuras/Mooncase' target="_blank">
                    Repository on github
                </MuiLink>
                <MuiLink href='https://moonriver.moonscan.io/address/0x30e7f47755a979221cbadee1844532297f5b928a' target="_blank">
                    Smart Contract on block explorer
                </MuiLink>
                <MuiLink href='https://www.covalenthq.com/' target="_blank">
                    Covalenthq
                </MuiLink>
            </Box>
            <Typography variant='h4' textTransform={'uppercase'} component={'div'} sx={{width:'100%'}}>
                ROADMAP / Pending
            </Typography>

            <ul>
                <li>Create my own indexer to retrieve the data</li>
                <li>Make Mooncase available on Moonbeam and Moonbase</li>
                <li>Allow the user to remove names from webapp</li>
                <li>Improve Website</li>
            </ul>
        </Container>
    )
}