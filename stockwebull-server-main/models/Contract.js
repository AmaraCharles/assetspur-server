const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    contractName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      maxDeposit: {
        type: String,
        required: true,
      },
      minDeposit: {
        type: String,
        required: true,
      },
      giftBonus: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model("contract", contractSchema);
