import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import HttpError from "./models/http-error.js";
import { register,login, getUsers, logout } from "./controllers/users-controllers.js";
import { postHeartHealth,postLipid, postSugar ,postUrine } from "./controllers/post-tests-controllers.js";
import { getLipid, getSugar, getUrine, gethearthealth } from "./controllers/get-tests-controllers.js";
import { IsAuthorized } from "./middleware/IsAuthorized.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:"https://ehr-1-gk0j.onrender.com",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));
app.post("/register",register);
app.post("/login",login);
app.get("/logout",logout);
app.get("/getuser",IsAuthorized,getUsers); 

app.post("/hearthealth",postHeartHealth);
app.post("/lipid",postLipid);
app.post("/sugar",postSugar);
app.post("/urine",postUrine);

app.get("/hearthealth/:user",IsAuthorized,gethearthealth);
app.get("/lipid/:user", IsAuthorized,getLipid);
app.get("/sugar/:user",IsAuthorized, getSugar);
app.get("/urine/:user", IsAuthorized,getUrine);


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

mongoose
  .connect(
    DATABASE_URL
  )
  .then(() => {
    console.log("Server Running");
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });