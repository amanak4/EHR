import { cred } from "./userController.js";
import { db } from "../database/dbconnection.js";

export const gethearthealth = async (req, res) => {
    const name = cred.email;

    const systole = await db.query("SELECT systolicbp FROM hearthealth WHERE name = $1", [
        name,
    ]);
    const diastole = await db.query("SELECT diastolicbp FROM hearthealth WHERE name = $1", [
        name,
    ]);
    // console.log("diastole",diastole.rows[0]);
    const heartbeat = await db.query("SELECT heartbeat FROM hearthealth WHERE name = $1", [
        name,]);

        const test_date = await db.query("SELECT test_date FROM hearthealth WHERE name = $1", [
            name,]);
    // 
    const Systole =  systole.rows.map(row => row.systolicbp);
    const Diastole = diastole.rows.map(row=>row.diastolicbp);
    const Heartbeat = heartbeat.rows.map(row=>row.heartbeat);
  const date =  test_date.rows.map(row=>row.test_date);
        res.json({
            success:true,
            data:{
            Systole,
            Diastole,
            Heartbeat,
            name,
            date
            }
        })

};

export const getLipid = async (req, res) => {

    const name = cred.email;

    const totalCholesterol = await db.query("SELECT total_cholesterol FROM lipid WHERE name = $1", [
        name,
    ]);
    const ldlCholesterol = await db.query("SELECT ldl_cholesterol FROM lipid WHERE name = $1", [
        name,
    ]);
    const hdlCholesterol = await db.query("SELECT hdl_cholesterol FROM lipid WHERE name = $1", [
        name,
    ]);
    const tryglycerides = await db.query("SELECT tryglycerides FROM lipid WHERE name = $1", [
        name,
    ]);

    const test_date = await db.query("SELECT test_date FROM lipid WHERE name = $1", [
        name,
    ]);
    const TotalCholesterol = totalCholesterol.rows.map(row => row.total_cholesterol);
    const LdlCholesterol = ldlCholesterol.rows.map(row => row.ldl_cholesterol);
    const HdlCholesterol = hdlCholesterol.rows.map(row => row.hdl_cholesterol);
    const Tryglycerides = tryglycerides.rows.map(row => row.tryglycerides);
    const date = test_date.rows.map(row => row.test_date);

    res.json({
        success:true,
        data:{
            TotalCholesterol,
            LdlCholesterol,
            HdlCholesterol,
            Tryglycerides,
            name,date
        }
    })
};

export const getSugar = async (req, res) => {

    const name = cred.email;
    console.log(name);

    const randomSugar = await db.query("SELECT random_sugar FROM sugar WHERE name = $1", [
        name,
    ]);
    const fastingSugar = await db.query("SELECT fasting_sugar FROM sugar WHERE name = $1", [
        name,
    ]);

    const test_date = await db.query("SELECT test_date FROM sugar WHERE name = $1", [
        name,
    ]);

    const RandomSugar = randomSugar.rows.map(row=>row.random_sugar);
    const FastingSugar = fastingSugar.rows.map(row=>row.fasting_sugar);
    const date = test_date.rows.map(row => row.test_date);

    res.json({
        success:true,
        data:{
            RandomSugar,
            FastingSugar,
            name,date
        }
    })
};

export const getUrine = async (req, res) => {

    const name = cred.email;

    const colour = await db.query("SELECT colour FROM urine WHERE name = $1", [
        name,
    ]);
    const ph = await db.query("SELECT ph FROM urine WHERE name = $1", [
        name,
    ]);
    const ketone = await db.query("SELECT ketone FROM urine WHERE name = $1", [
        name,]);
    const glucose = await db.query("SELECT glucose FROM urine WHERE name = $1", [
        name,]);
    const bilirubin = await db.query("SELECT bilirubin FROM urine WHERE name = $1", [
        name,]);
        const test_date = await db.query("SELECT test_date FROM urine WHERE name = $1", [
            name,
        ]);

   const Colour = colour.rows.map(row=>row.colour);
   const PH = ph.rows.map(row=>row.ph);
   const Ketone = ketone.rows.map(row=>row.ketone);
   const Glucose = glucose.rows.map(row=>row.glucose);
   const Bilirubin = bilirubin.rows.map(row=>row.bilirubin);
   const date = test_date.rows.map(row => row.test_date);

   res.json({
    success:true,
    data:{
        Colour,
        PH,
        Ketone,
        Glucose,
        Bilirubin,
        name,date
    }
})
};

