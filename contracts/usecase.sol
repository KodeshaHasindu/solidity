// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Identity {
    mapping(address => UserInfo) public userList;

    struct UserInfo {
        string firstName;
        string lastName;
        string dob;
        string country;
        bool verified;
    }

    UserInfo[] public people;

    function addUser(string memory firstName, string memory lastName, string memory dob, string memory country) public returns (bool success) {
    UserInfo memory newUserInfo = UserInfo({
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        country: country,
        verified: true 
    });

    // Add the new user to the mapping and array
    userList[msg.sender] = newUserInfo;
    people.push(newUserInfo);

    return true; // Return the success flag
}

    function getUser(uint _index) public view returns (string memory, string memory, string memory, string memory) {
        require(_index < people.length, "Index out of bounds");
        UserInfo memory personToReturn = people[_index];
        return (personToReturn.firstName, personToReturn.lastName, personToReturn.dob, personToReturn.country);
    }

    function isUserVerified() public view returns (bool) {
        UserInfo memory user = userList[msg.sender];
        return user.verified;
    }

    function locationVerified() public view returns (bool) {
        UserInfo memory user = userList[msg.sender];
        
        // Replace 'country' with the country code you want to compare
        string memory targetCountryCode = 'sri lanka'; 

        // Compare the country code for verification
        return keccak256(abi.encodePacked(user.country)) == keccak256(abi.encodePacked(targetCountryCode));

    // function ageVerified() public view returns (bool){
    //     UserInfo memory user = userList[msg.sender];
        


    // }
    }
}
