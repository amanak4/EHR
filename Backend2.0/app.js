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
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3000",
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
    `mongodb+srv://22je0094:6fUKORytz4DEB9cr@cluster0.rz6z7c1.mongodb.net/EHR?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Server Running");
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });