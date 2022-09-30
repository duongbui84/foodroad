import bcrypt from "bcryptjs";
import db from "../models/index";

let handleUserLogIn = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let user = await db.User.findOne({
        raw: true,
        where: { email: email },
        attributes: ["email", "fullName", "password", "address", "gender"],
      });

      if (!user) {
        result.errCode = 2;
        result.errMessage = "User not exits in system !";
        resolve(result);
      }

      let isPassword = await bcrypt.compareSync(password, user.password);

      if (!isPassword) {
        result.errCode = 3;
        result.errMessage = "Wrong password !";
        resolve(result);
      } else {
        result.errCode = 0;
        result.errMessage = "";
        delete user.password;
        result.userData = user;
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserSignIn = async (email, password, fullName, address, gender) => {};

module.exports = {
  handleUserLogIn,
  handleUserSignIn,
};
