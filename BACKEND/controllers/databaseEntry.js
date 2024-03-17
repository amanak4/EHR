import { db } from "../database/dbconnection.js";

export const postHeartHealth = async(req,res)=>{
    
    const systolicBP = req.body.systolicBP;
    const diastolicBP = req.body.diastolicBP;
    const heartbeat = req.body.heartbeat;
    const name = req.body.email;
    const date=req.body.date;
    if(!systolicBP||!diastolicBP||!heartbeat||!name||!date){
         return res.json({
            success:false,
            error:"Fill the form completely!"
        })
    }
    await db.query("INSERT INTO hearthealth (systolicbp, diastolicbp, heartbeat, name,test_date) values($1, $2, $3,$4,$5)",
    [systolicBP,diastolicBP,heartbeat,name,date]);
    res.json({
     success:true,
     message:"Data Stored !",
      
     heartHealth:{
        systolicBP,
        diastolicBP,
        heartbeat,
        name,
        date
     }
    });
    

};


export const postLipid = async(req,res)=>{
    const totalCholesterol=req.body.totalCholesterol;
    const ldlCholesterol = req.body.ldlCholesterol;
    const hdlCholesterol= req.body.hdlCholesterol;
    const tryglycerides= req.body.tryglycerides;
    const name = req.body.email;
    const date = req.body.date;

    if(!totalCholesterol||!ldlCholesterol||!hdlCholesterol||!name||!tryglycerides||!date){
        return res.json({
           success:false,
           error:"Fill the form completely!"
       })
   }

    await db.query("INSERT INTO lipid (total_cholesterol, ldl_cholesterol, hdl_cholesterol, tryglycerides,name,test_date) values($1, $2, $3,$4,$5,$6)",
    [totalCholesterol,ldlCholesterol,hdlCholesterol,tryglycerides,name,date]);

    res.json({
        success:true,
        message:"Data Stored !",
         
       Lipid:{
        totalCholesterol,
        ldlCholesterol,
        hdlCholesterol,
        tryglycerides,
        date,
        name
        }
       });

};

export const postSugar= async(req,res)=>{
      const randomSugar = req.body.randomSugar;
      const fastingSugar = req.body.fastingSugar;
      const name = req.body.email;
      const date = req.body.date;

      if(!randomSugar||!fastingSugar||!date||!name){
        return res.json({
           success:false,
           error:"Fill the form completely!"
       })
   }

      await db.query("INSERT INTO sugar (fasting_sugar, random_sugar, name,test_date) values($1, $2, $3,$4)",
    [randomSugar,fastingSugar,name,date]);

    res.json({
        success:true,
        message:"Data Stored!",
         
        Sugar:{
            randomSugar,
            fastingSugar,
           name,date
        }
       });
};

export const postUrine = async(req,res)=>{
    const colour = req.body.colour;
    const pH = req.body.pH;
    const ketone = req.body.ketone;
    const glucose= req.body.glucose;
    const bilirubin= req.body.bilirubin;
    const name = req.body.email;
    const date = req.body.date;
    if(!colour||!pH||!ketone||!name||!glucose||!bilirubin||!date){
        return res.json({
           success:false,
           error:"Fill the form completely!"
       })
   }
    await db.query("INSERT INTO urine (colour, ph, ketone, glucose,bilirubin,name,test_date) values($1, $2, $3,$4,$5,$6,$7)",
    [ colour,pH,ketone,glucose,bilirubin,name,date]);

    res.json({
        success:true,
        message:"Data Stored !",
         
       Urine:{
        colour,
       pH,
        ketone,
       glucose,
       bilirubin,
        name,
        date
        }
       });
};