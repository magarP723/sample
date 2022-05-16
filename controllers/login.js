const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({
      status: "error",
      error: "Please Enter your email and Password",
    });
  else {
    console.log("sasd");
    db.query(
      "SELECT email FROM users WHERE email=?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (
          !result.length ||
          !(await bcrypt.compare(password, result[0].password))
        )
          return res.json({
            status: "error",
            error: "Incorrect email or password",
          });
        else {
          const token = jwt.sign(
            { id: result[0].id },
            "apleisred&&mangoisGREEN",
            { expiresIn: "90d", httpOnly: true }
          );
          const cookieOptions = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 1000),
            httpOnly: true,
          };
          res.cookie("userRegistered", token, cookieOptions);
          return res.json({
            status: "success",
            success: "User has been Logged In",
          });
        }
      }
    );
  }
};

module.exports = login;
