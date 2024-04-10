import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { Schema } from "mongoose";

const bpSchema = new Schema({
    name:{type:String, required:true},
    systolicBP: { type: Number, required: true },
    diastolicBP: { type: Number, required: true },
    heartbeat: { type: Number, required: true},
   date:{type: Date,  required:true}
});

bpSchema.plugin(uniqueValidator);



const lipidSchema = new Schema({
    name:{type:String, required:true},
    totalCholesterol: { type: Number, required: true },
    ldlCholesterol: { type: Number, required: true },
    hdlCholesterol: { type: Number, required: true},
    tryglycerides : {type: Number, required:true},
    date:{type: Date,  required:true}
});

lipidSchema.plugin(uniqueValidator);


const sugarSchema = new Schema({
    name:{type:String, required:true},
    randomSugar: { type: Number, required: true },
    fastingSugar: { type: Number, required: true },
    date:{type: Date,  required:true}
});

sugarSchema.plugin(uniqueValidator);


const urineSchema = new Schema({
    name:{type:String, required:true},
    colour: { type: String, required: true },
    pH: { type: Number, required: true },
    ketone: { type: String, required: true},
    glucose:{type: String, required:true},
    bilirubin:{type:String, required:true},
   date:{type: Date,  required:true}
});

urineSchema.plugin(uniqueValidator);

export  const Urine = mongoose.model("Urine",urineSchema);

export  const Sugar = mongoose.model("Sugar",sugarSchema);

export  const Lipid = mongoose.model("Lipid",lipidSchema);

export  const BP = mongoose.model("BP",bpSchema);