import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        fullName: data.fullName,
        email: data.email,
        password: hashPasswordFromBcrypt,
        address: data.address,
        gender: data.gender,
      });
      resolve("Oke create new user success");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = () => {
  return db.User.findAll({ raw: true })
    .then((listUsers) => listUsers)
    .catch((e) => {
      throw new Error(e);
    });
};

//   return new Promise(async (resolve, reject) => {
//     try {
//       let listUsers = await db.User.findAll({ raw: true });
//       resolve(listUsers);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

let getUserInfoById = (userId) => {
  return db.User.findOne({ raw: true, where: { id: userId } })
    .then((result) => {
      if (result) {
        return result;
      } else return {};
    })
    .catch((e) => {
      throw new Error(e);
    });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newUser = await db.User.findOne({
        raw: true,
        where: { id: data.id },
      });
      if (newUser) {
        db.User.update(
          {
            email: data.email,
            fullName: data.fullName,
            address: data.address,
            gender: data.gender,
          },
          { where: { id: data.id } }
        );
        resolve(newUser);
      } else resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id } });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
