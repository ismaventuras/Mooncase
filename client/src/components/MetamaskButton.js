import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils/Web3Utils";



export default function MetamaskButton() {
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