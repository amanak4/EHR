import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
// import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./database/dbconnection.js";
import { gethearthealth , getLipid, getSugar,getUrine} from "./controllers/entrycontrollers.js";
import { postHeartHealth, postLipid, postSugar, postUrine } from "./controllers/databaseEntry.js";
import { getuser, login, logout, register } from "./controllers/userController.js";
const app = express();
const port = 4000;
const saltRounds = 10;
env.config();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));
app.use(
  session({
    name: 'token', 
    secret:"asdfghjlkjhgfdsa",
    resave: false,
    saveUninitialized: true,
  })
);


// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use((
// app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

db.connect();



// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// app.get(
//   "/auth/google/",
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

app.post("/register",register);
app.post("/login",login);
app.get("/logout",logout);
app.get("/getuser",getuser); 

app.post("/hearthealth",postHeartHealth);
app.post("/lipid",postLipid);
app.post("/sugar",postSugar);
app.post("/urine",postUrine);

app.get("/hearthealth",gethearthealth);
app.get("/lipid", getLipid);
app.get("/sugar", getSugar);
app.get("/urine", getUrine);


  
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM login WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM login WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO login (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
