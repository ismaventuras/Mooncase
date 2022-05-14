import { ethers } from 'ethers'
import { provider} from '../src/info'
import ERC721Abi from '../src/abi/ERC721.json'
import ERC165 from '../src/abi/ERC165.json'
import ERC1155Abi from '../src/abi/ERC1155.json'

const ERC721Bytes4 = '0x80ac58cd'
const ERC1155Bytes4 = '0xd9b67a26'

export const isERC721 = async (address) => {
    try{
        const contract = new ethers.Contract(address, ERC165, provider)
        const isContract =  await contract.supportsInterface(ERC721Bytes4)
        return isContract
    }
    catch(error){
        return error
    }
}
export const isERC1155 = async (address) => {
    try{
        const contract = new ethers.Contract(address, ERC165, provider)
        const isContract =  await contract.supportsInterface(ERC1155Bytes4)
        return isContract        
    }
    catch(error){
        return error
    }
}

export const isNFT = async (address) => {
    try{
        const contract = new ethers.Contract(address, ERC165, provider)
        const is721 = await contract.supportsInterface(ERC721Bytes4)
        const is1155 =  await contract.supportsInterface(ERC1155Bytes4)
        if(is721 || is1155) return true
        else return false
    }
    catch(error){
        return false
    }
}

export const getNFTData = async(address) => {
    try{
        const contract = new ethers.Contract(address, ERC721Abi, provider)
        const name = await contract.name()
        const symbol = await contract.symbol()
        return {name, symbol}

    }
    catch(error){
        return false
    }
}