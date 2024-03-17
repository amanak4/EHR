import bcrypt from "bcrypt";
import { db } from "../database/dbconnection.js";
const saltRounds = 10;
const cred ={
  email:""
}
export const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

 cred.email=email;

  if (!email || !password || !name) {
      return res.json({
          success: false,
          error: "Fill the form completely!"
      });
  }

  try {
      const checkResult = await db.query("SELECT * FROM login WHERE email = $1", [email]);

      if (checkResult.rows.length > 0) {
          return res.json({
              success: true,
              message: "User already exists!"
          });
      } else {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
              if (err) {
                  console.error("Error hashing password:", err);
                  return res.json({
                      success: false,
                      error: "Error hashing password"
                  });
              } else {
                  const result = await db.query("INSERT INTO login (email, password, name) VALUES ($1, $2, $3) RETURNING *", [email, hash, name]);
                  const user = result.rows[0];
                  req.login(user, (err) => {
                      if (err) {
                          console.error("Error during login:", err);
                          return res.json({
                              success: false,
                              error: "Error during login"
                          });
                      }
                      console.log("success");
                      return res.json({
                          success: true,
                          message: "Successfully registered!",
                           user
                      });
                  });
              }
          });
      }

  } catch (err) {
      console.log(err);
      return res.json({
          success: false,
          error: "Internal server error"
      });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  const loginPassword = req.body.password;

  
 cred.email=email;

  if (!email || !loginPassword) {
      return res.json({
          success: false,
          error: "Fill the form completely!"
      });
  }

  try {
      const result = await db.query("SELECT * FROM login WHERE email = $1", [email]);
      if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashPassword = user.password;
          //verifying the password
          bcrypt.compare(loginPassword, storedHashPassword, (err, result) => {
              if (err) {
                  console.error("Error comparing passwords:", err);
                  return res.json({
                      success: false,
                      error: "Error comparing passwords"
                  });
              } else {
                  if (result) {
                      return res.json({
                          success: true,
                          message: "Successfully logged in!",
                          user
                      });
                  } else {
                      return res.json({
                          success: false,
                          error: "Incorrect Password or Email"
                      });
                  }
              }
          });
      } else {
          return res.json({
              success: false,
              error: "User not found"
          });
      }
  } catch (err) {
      console.log(err);
      return res.json({
          success: false,
          error: "Internal server error"
      });
  }
};
export const getuser = async (req, res) => {
  
     if(cred&&cred.email){
          return res.json({
              success: true,
              message: "Already LoggedIn!",
              email: cred.email
          });
      
  } else {
      return res.json({
          success: false,
          message: "User credentials not found!"
      });
  }
}

export const logout = async (req, res) => {
  // Clear the email property in 'cred' object
  cred.email = "";
  // Clear the 'token' cookie
  res.clearCookie("token").json({
      success: true,
      message: "Logout Successfully!"
  });
}

export {cred};
