var express = require("express");
var { hashPassword, sendWelcomeEmail,resendWelcomeEmail,resetEmail, sendUserDetails } = require("../../utils");
const UsersContract = require("../../models/Contract");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Function to generate a referral code


router.post("/contract", async (req, res) => {
  const { contractName, price, minDeposit, maxDeposit, giftBonus, duration } = req.body;

  try{

        const newContract = {
        contractName,
         price, 
         minDeposit, 
         maxDeposit, 
         giftBonus, 
         duration ,
    };

   
    const createdContract= await UsersContract.create(newContract);
    
    return res.status(200).json({ code: "Ok", data: createdContract });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});






module.exports = router;
