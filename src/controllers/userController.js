import userService from "../services/userService";
import CRUDservice from "../services/CRUDservice.js";

let handleLogIn = async (req, res) => {
  let emailLogin = await req.body.email;
  let passwordLogin = await req.body.password;

  if (!emailLogin || !passwordLogin) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing input parameter !",
    });
  } else {
    let result = await userService.handleUserLogIn(emailLogin, passwordLogin);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
      userData: result.userData ? result.userData : {},
    });
  }
};

let handleSignUp = async (req, res) => {
  let fullName = await req.body.fullName;
  let email = await req.body.email;
  let password = await req.body.password;
  let address = await req.body.address;
  let gender = await req.body.gender;
  let data = {
    email,
    password,
    fullName,
    address,
    gender,
  };
  if (!fullName || !email || !password || !address) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing input parameter !",
    });
  } else {
    await CRUDservice.createNewUser(data);
    return res.status(200).json("Created new acc !");
  }
};

module.exports = {
  handleLogIn,
  handleSignUp,
};
