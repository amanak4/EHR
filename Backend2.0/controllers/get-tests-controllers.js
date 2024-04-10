import HttpError from "../models/http-error.js";
import {BP, Lipid, Sugar, Urine} from "../models/tests.js";


export const gethearthealth = async(req,res,next)=>{
   
    // const name = req.params.user;
    const name=req.user.email;
    // console.log(name);
    let hh;
    try{
        const data = await BP.find({name});
        hh = JSON.parse(JSON.stringify(data));
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    
      const result = hh.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj[key]);
        });
        return acc;
      }, {});
      
    //   console.log(result);
      res.json({data: result});
};


export const getLipid = async(req,res,next)=>{
   
    // const name = req.params.user;
    const name=req.user.email;
    // console.log(name);
    let hh;
    try{
        const data = await Lipid.find({name});
        hh = JSON.parse(JSON.stringify(data));
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    
      const result = hh.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj[key]);
        });
        return acc;
      }, {});
      
      res.json({data: result});
};

export const getSugar = async(req,res,next)=>{
   
    // const name = req.params.user;
const name=req.user.email;
    // console.log(name);
    let hh;
    try{
        const data = await Sugar.find({name});
        hh = JSON.parse(JSON.stringify(data));
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
    console.log(hh);
      const result = hh.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj[key]);
        });
        return acc;
      }, {});
      

      res.json({data:result,message:"your sugar report",success:true });
};


export const getUrine = async(req,res,next)=>{
   
    // const name = req.params.user;
    const name=req.user.email;
    // console.log(name);
    let hh;
    try{
        const data = await Urine.find({name});
        hh = JSON.parse(JSON.stringify(data));
        // console.log("checking");
        // console.log("hh=",hh);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find the user.",
            500
        );
        return next(error);
    }
    //  console.log("hello");
    if (!hh) {
        const error = new HttpError(
          'Could not find user for the provided name.',
          404
        );
        return next(error);
      }
      const result = hh.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj[key]);
        });
        return acc;
      }, {});
      
      res.json({data: result });
};