import { ethers } from "ethers"

import { nameSolverAddress, provider } from "../src/info"
import NameSolverAbi from "../src/abi/NameSolver.json"


export const findName = async (name) => {
    try{
        const contract = new ethers.Contract(nameSolverAddress,NameSolverAbi, provider)
        const bytes32name = ethers.utils.formatBytes32String(name)
        const found = await contract.savedNames(bytes32name)
        if(found.isValid) return found
        else return false
    }
    catch(error){
        return false
    }
}

export const createName = async (contractAddress, tokenId, chainId, name, provider) => {
    var tx, error
    try{
        const contract = new ethers.Contract(nameSolverAddress,NameSolverAbi, provider)
        const bytes32name = ethers.utils.formatBytes32String(name)
        tx = await contract.add(contractAddress, tokenId, chainId, bytes32name)        
        
    }
    catch(err){
        error = err
    }

    return {tx, error}
}

export const getEvents = async () => {
    try{
        const contract = new ethers.Contract(nameSolverAddress,NameSolverAbi, provider)
        const data = contract.filters.NewName(null,"0xD95E65d9A38ce96BE9caa71ca7576294cD3562dA")
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}

