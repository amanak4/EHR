import React, { useContext, useState } from 'react';
import './ServiceProvider.css';
import toast from 'react-hot-toast';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { lipids } from '../data/lipids.js'
import { urine } from '../data/urine.js';
import { bp } from '../data/sys.js';
import { sugar } from '../data/sugar.js';
import axios from 'axios';
function ServiceProvider() {
  const [disease, setDisease] = useState('');
  const [serviceProviderName, setServiceProviderName] = useState('');
  const {isAuthorized,setIsAuthorized,user,setUser,setLipidData,setUrineData,setbpData,setSugarData,lipidData,sugarData,bpData}=useContext(Context);
  const navigateTo=useNavigate();
  const email=user.email;
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isAuthorized){
      toast.error("User not Authorized!");
      navigateTo('/login');
      return;
    }
    const randomIndex = Math.floor(Math.random() * lipids.length); // Get a random index
    const randomLipid = lipids[randomIndex].data;
    const randomIS=Math.floor(Math.random() * sugar.length);
     
    const randomSugar=sugar[randomIS].data;
    console.log("random",randomLipid); 
    const randomBp=bp[Math.floor(Math.random() * bp.length)].data;
    const randomUrine=urine[Math.floor(Math.random() * urine.length)].data;
       

//     const randomIndex = Math.floor(Math.random() * lipids.length); // Get a random index
// const randomLipid = lipids[randomIndex].data;

// Assuming randomLipid is an array of lipid data objects


// const randomIndex = Math.floor(Math.random() * lipids.length); // Get a random index
// const randomLipid = lipids[randomIndex].data;

randomLipid.forEach(lipidEntry => {
  const postData = {
    totalCholesterol: lipidEntry.totalCholesterol,
    ldlCholesterol: lipidEntry.ldlCholesterol,
    hdlCholesterol: lipidEntry.hdlCholesterol,
    tryglycerides: lipidEntry.Triglycerides, // Assuming the key is "Triglycerides" in the data
    email: email,
    date: lipidEntry.date // Assuming the key is "date" in the data
  };

  // const datamunna=JSON.stringify(postData);

const fxndata=async()=>{
  const response= await axios.post("http://localhost:4000/lipid",postData,{withCredentials:true,
  headers:{
    "Content-Type":"application/json",
  },});
  console.log("response",response);
  
}

fxndata();
});
  
// const randomIndex = Math.floor(Math.random() * bp.length); // Get a random index
// const randomBp = bp[randomIndex].data;

randomBp.forEach(bpEntry => {
  const postData = {
    systolicBP: bpEntry.systolic_bp,
    diastolicBP: bpEntry.diastolic_bp,
    heartbeat: bpEntry.heartbeat,
    email: email,
    date: bpEntry.date
  };

  const fxndata=async()=>{
    await axios.post("http://localhost:4000/hearthealth", postData)
    .then(response => {
      console.log('Blood pressure (bp) data posted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error posting bp data:', error);
    });

    } 
  fxndata();
  });



// const randomIndex = Math.floor(Math.random() * urine.length); // Get a random index
// const randomUrine = urine[randomIndex].data;

randomUrine.forEach(urineEntry => {
  const postData = {
    colour: urineEntry.colour,
    pH: urineEntry.pH,
    ketone: urineEntry.Ketone,
    glucose: urineEntry.Glucose,
    bilirubin: urineEntry.Bilirubin,
    email: email,
    date: urineEntry.date
  };
const fxndata=async()=>{
  await axios.post("http://localhost:4000/urine", postData)
    .then(response => {
      console.log('Urine data posted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error posting urine data:', error);
    });
  }
  fxndata();
});


// const axios = require('axios');

// const randomIndex = Math.floor(Math.random() * sugar.length); // Get a random index
// const randomSugar = sugar[randomIndex].data;

randomSugar.forEach(sugarEntry => {
  const postData = {
    fastingSugar: sugarEntry.fastingSugar,
    randomSugar: sugarEntry.randomSugar,
    email: email,
    date: sugarEntry.date
  };
const fxndata=async()=>{
 await  axios.post("http://localhost:4000/sugar", postData)
    .then(response => {
      console.log('Sugar data posted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error posting sugar data:', error);
    });
}  
fxndata();
  });


   navigateTo('/blood-pressure-stats');
  };

  return (
    <div className='body'>
    <div className='data-service-provider'>
      <div className="service-provider-container">
        <div className='heading'><h2>Register with the Right Healthcare Provider</h2></div>
        <div>
          <form className="service-provider-form" onSubmit={handleSubmit}>
            <label className="service-provider-label" htmlFor="service-provider-name">Service Provider Name:</label>
            <select
              className="service-provider-select"
              id="service-provider-name"
              onChange={(e) => setServiceProviderName(e.target.value)}
            >
              <option >Select Service Provider</option>
              <option>Dr. Lal PathLab's</option>
              <option>Redcliffe Labs</option>
              <option>Metropolis Pathology Lab</option>
              <option>Thyrocare Aarogyam</option>
              <option>Apollo Diagnostics</option>
            </select>
            <label className="service-provider-label" htmlFor="user-id">User Id:</label>
            <input className="service-provider-input" type="text" id="user-id" placeholder="14526789@jak" />
            <button className="service-provider-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ServiceProvider;
