const Admin = require("../models/Admin");
const verification = require("../config/otp");
const { token } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const adminData = await Admin.findOne({ where: { email } });
      if (!adminData) {
        return res.status(400).json({ message: "Admin not found" });
      } else {
        const Email = adminData.email;
        const Password = adminData.password;
        if (Email == email) {
          if (Password == password) {
            const Token = token(Email, "admin");
            return res
              .status(200)
              .json({ message: "admin Loggedin", role: "admin", token: Token });
          } else {
            return res.status(400).json({ message: "Invalid password" });
          }
        } else {
          return res.status(400).json({ message: "Invalid Email" });
        }
      }
    } catch (error) {
      console.log(err);
    }
  },
};

