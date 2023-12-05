const {ethers} = require("hardhat");
//console.log(ethers);

async function main(){
    // const  currentTimestampInSeconds = Math.round(Date.now() / 1000);
    // const ONE_YeARS_IN_SECONDS = 356 * 24 * 60 * 60;
    // const unlockedTime = currentTimestampInSeconds + ONE_YeARS_IN_SECONDS;

    // const lockedAmount = ethers.parseEther("1");
    //const lockedAmount = hre.ethers.utils;


// console.log(currentTimestampInSeconds);
// console.log(ONE_YeARS_IN_SECONDS);
// console.log(unlockedTime);
//console.log(lockedAmount);

const UserId = await ethers.getContractFactory("UserId");
const myTest = await UserId.deploy();

await myTest.getDeployedCode();

console.log('userID deployed');

}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exitCode =1;
});
