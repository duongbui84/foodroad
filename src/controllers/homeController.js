import db from "../models/index";
import CRUDservice from "../services/CRUDservice.js";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = (req, res) => {
  return res.render("signUpUser.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);
  return res.send("create new user");
};

let displayCRUD = async (req, res) => {
  let listUsers = await CRUDservice.getAllUsers();
  return res.render("displayCRUD.ejs", { listUsers });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userInfo = await CRUDservice.getUserInfoById(userId);
    return res.render("editUserCRUD.ejs", { userInfo });
  } else {
    return res.send("User not found !!!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let newUser = await CRUDservice.updateUserData(data);
  console.log(newUser);
  return res.send("Update done!!!!!!!!!!!!!!!!");
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDservice.deleteUserById(userId);
    return res.send("User account deleted !");
  } else {
    return res.send("User not found !!!");
  }
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
