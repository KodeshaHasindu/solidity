const { expect } = require("chai");

describe("UserId contract", function () {
  let userIdContract;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const UserId = await ethers.getContractFactory("userId");
    userIdContract = await UserId.deploy();
    
  });

  it("should create a user ID", async function () {
    const result = await userIdContract.createUserId(
      user1.address,
      "kodesha",
      "hasindu",
      1998,
      5,
      29,
      "US"
    );

    expect(result).to.emit(userIdContract, "idCreated").withArgs(1, user1.address);
    expect(await userIdContract.isVerified(user1.address)).to.be.true;
  });
 it("should verify location", async function () {
    await userIdContract.createUserId(user1.address, "kodesha", "hasindu", 1998, 5, 29, "US");

    const result = await userIdContract.locationVerified(user1.address, "US");

    expect(result).to.be.true;
  });

  it("should verify age limit", async function () {
    await userIdContract.createUserId(user1.address, "John", "Doe", 2000, 1, 1, "US");
  
    // Use .wait() to get the transaction receipt
    const txReceipt = await userIdContract.verifyAgeLimit(user1.address, 18);
  
    // Extract the event from the logs
    const event = txReceipt.events.find((e) => e.event === "AgeVerified");
  
    // Check the value emitted in the event
    expect(event.args.verified).to.be.true;
  
    // Check the ageVerified property in the UserStruct mapping
    const userStruct = await userIdContract.UserStruct(user1.address);
    expect(userStruct.ageVerified).to.be.true;
  });
  
  

  
 });
