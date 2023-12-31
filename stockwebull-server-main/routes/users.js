var express = require("express");
const UsersDatabase = require("../models/User");
const { hashPassword } = require("../utils");
const multer = require('multer');
var router = express.Router();
const port=3000

// const storage = multer.diskStorage({
//   destination: 'uploads', // Directory to store uploaded files
//   filename: (req, file, cb) => {
//       // Generate a unique filename for each uploaded file
//       cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Serve the HTML form
// router.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// var app = require('../app');
// var debug = require('debug')('excelmarktrade-server:server');
// var server = http.createServer(app);
// var http = require('http');

// router.post('/upload', upload.single('image'), (req, res) => {
//   // File is uploaded, and req.file contains information about the uploaded file
//   res.send('Image uploaded successfully!');
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




router.get("/", async function (req, res, next) {
  const users = await UsersDatabase.find();

  res.status(200).json({ code: "Ok", data: users });
});

/* GET users listing. */
router.get("/:email", async function (req, res, next) {
  const { email } = req.params;

  const user = await UsersDatabase.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  res.status(200).json({ code: "Ok", data: user });
});
router.delete("/:email/delete", async function (req, res, next) {
  const { email } = req.params;

  const user = await UsersDatabase.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  user.deleteOne();

  res.status(200).json({ code: "Ok" });
});

router.put("/:_id/profile/update", async function (req, res, next) {
  const { _id } = req.params;

  const user = await UsersDatabase.findOne({ _id: _id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  try {
    await user.updateOne({
      ...req.body,
    });

    return res.status(200).json({
      message: "update was successful",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:_id/accounts/update", async function (req, res, next) {
  const { _id } = req.params;
  const accountDict = req.body;
  const data = accountDict.values;

  const user = await UsersDatabase.findOne({ _id: _id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  const cummulative = Object.assign({}, user.accounts, JSON.parse(data));

  console.log(cummulative);

  try {
    await user.updateOne({
      accounts: {
        ...cummulative,
      },
    });

    return res.status(200).json({
      message: "Account was updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:_id/accounts", async function (req, res, next) {
  const { _id } = req.params;

  const user = await UsersDatabase.findOne({ _id: _id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  return res.status(200).json({
    data: user.accounts,
    message: "update was successful",
  });
});

module.exports = router;
