import {expect} from"chai";
import {ethers} from "hardhat";
import {generateTree} from "../scripts/merkletree"
import { keccak256 } from 'ethers/lib/utils'

describe("MerkleTree", function(){
    it ("Should verify a velid proof", async function(){
        const tree = await generateTree();
        const root = tree.getHexRoot();
        const [addr] = await ethers.getSigners();
        const hashedAddr = keccak256(addr.address)
        console.log('Looking For: ' + addr.address + '->' + hashedAddr)
        const proof = tree.getHexProof(hashedAddr)
        const Merkle = await ethers.getContractFactory("Merkle");
        const merkle = await Merkle.deploy(root);
        await merkle.getDeployedCode();

        expect(await merkle.verify(proof)).to.equal(true);

    })
})