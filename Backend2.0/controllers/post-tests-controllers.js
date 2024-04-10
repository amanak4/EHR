import HttpError from "../models/http-error.js";
import { BP,Lipid,Sugar,Urine } from "../models/tests.js";

export const postHeartHealth = async(req,res,next)=>{
    
     const {name,systolicBP,diastolicBP,heartbeat,date}=req.body;

     const hearthealth = new BP({
        name,
        systolicBP, 
        diastolicBP,
        heartbeat,
        date
      });
    
      try {
        await hearthealth.save();
      } catch (err) {
        const error = new HttpError(
          'Failed to store data, please try again later.',
          500
        );
        return next(error);
      }
      
      res.status(201).json({
        success:true,
        message:"Successfully stored",
        userName: hearthealth.name, 
        systolicBP:hearthealth.systolicBP, 
        diastolicBP:hearthealth.diastolicBP,
        heartbeat:hearthealth.heartbeat,
        date:hearthealth.date
      });
};

export const postLipid = async(req,res,next)=>{
   
    const {name,totalCholesterol,ldlCholesterol,hdlCholesterol,tryglycerides,date} = req.body;

    const lipid = new Lipid({
        name,
        totalCholesterol,
        ldlCholesterol,
        hdlCholesterol,
        tryglycerides,
        date
    });
    console.log(lipid);
    try{
        await lipid.save();
    } catch(err){
        const error = new HttpError(
            "Failed to store the data,try again later",
            500
        );
        return next(error);
    }

    res.status(201).json({
        success:true,
        message:"Successfully stored",
        name:lipid.name,
        totalCholesterol:lipid.totalCholesterol,
        hdlCholesterol:lipid.hdlCholesterol,
        ldlCholesterol:lipid.ldlCholesterol,
        tryglycerides:lipid.tryglycerides,
        date:lipid.date
    });
};

export const postSugar = async(req,res,next)=>{
   
    const {name,fastingSugar,randomSugar,date} = req.body;

    const sugar = new Sugar({
        name,
        fastingSugar,
        randomSugar,
        date
    });
    console.log(sugar);
    try{
        await sugar.save();
    } catch(err){
        const error = new HttpError(
            "Failed to store the data,try again later",
            500
        );
        return next(error);
    }

    res.status(201).json({
        success:true,
        message:"Successfully stored",
        name:sugar.name,
        fastingSugar:sugar.fastingSugar,
        randomSugar:sugar.randomSugar,
        date:sugar.date
    });
};

export const postUrine = async(req,res,next)=>{
   
    const {name,colour,pH,ketone,glucose,bilirubin,date} = req.body;

    const urine = new Urine({
        name,
        colour,
        pH,
        ketone,
        glucose,
        bilirubin,
        date
    });
    console.log(urine);
    try{
        await urine.save();
    } catch(err){
        const error = new HttpError(
            "Failed to store the data,try again later",
            500
        );
        return next(error);
    }

    res.status(201).json({
        success:true,
        message:"Successfully stored",
        name:urine.name,
        colour:urine.colour,
        pH:urine.colour,
        ketone:urine.colour,
        glucose:urine.glucose,
        bilirubin:urine.bilirubin,
        date:urine.date
    });
};