import { AppBar, Box, Button, Container, Divider, Grid, Link, Toolbar, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../connectors";
import MuiLink from '../materialui/Link'
import ChangeThemeButton from "./ChangeThemeButton";
import { shortenAddress } from "../../utils/Web3Utils";
import Head from 'next/head'


export function MetamaskButton() {
    const { activate, active, account } = useWeb3React()
    const onClickConnect = async () => {
        if (!active) {
            await activate(injected, error => {
                alert(error)
            })
        }
    }
    return (
        <>
            <Button variant={active ? 'contained' : 'outlined'} color={active ? 'success' : 'inherit'} onClick={onClickConnect}>
                {active ? shortenAddress(account) : 'Connect'}
            </Button>
        </>
    )
}

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='inherit'>
                <Toolbar variant='dense'>
                    <MuiLink href={'/'} noLinkStyle sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" >Mooncase</Typography>
                    </MuiLink>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button variant='text' disabled>Moonriver</Button>
                        <MetamaskButton />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

function Footer(){
    return(
        <Grid container direction='column' justifyContent={'center'} alignItems={'center'} marginTop={5}>
            <Grid item xs={12}>
                <MuiLink href='/about'>
                    About
                </MuiLink>
            </Grid>
            <Grid item xs={12}>                
                <Typography variant='caption' align='center'>Made by ismael</Typography>
            </Grid>
        </Grid>
    )
}

export default function Layout({ children }) {
    const web3 = useWeb3React()

    
    return (
        <>
      <Head>
        <title>Mooncase</title>
        <meta name="description" content="A webapp to view and share NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Grid container sx={{}}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12} sx={{ my: 4, height:'100%' }}>
                <Container>
                    {children}
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
        </>
    )
}