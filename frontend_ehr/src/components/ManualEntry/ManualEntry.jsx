import React, { useContext, useState } from 'react';
import "./ManualEntry.css";
import { Context } from '../../index.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const baseClass = "basecontainer";
const inlineStyles = {
  backgroundColor: "#f5f5f5",
  padding: "20px",
  fontSize: "16px",
}

function ManualEntry() {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  
  const navigateTo=useNavigate();
  const [disease, setDisease] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");
  const [testDate, setTestDate] = useState("");
  const [fastingSugarData, setFastingSugarData] = useState("");
  const [randomSugarData, setRandomSugarData] = useState("");
  const [systolicBPData, setSystolicBPData] = useState("");
  const [diastolicBPData, setDiastolicBPData] = useState("");
  const [heartBeatData, setHeartBeatData] = useState("");
  const [urineColor, setUrineColor] = useState("");
  const [urinepH, setUrinepH] = useState("");
  const [urineKetone, setUrineKetone] = useState("");
  const [urineGlucose, setUrineGlucose] = useState("");
  const [urineBilirubin, setUrineBilirubin] = useState("");
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [ldlCholesterol, setLdlCholesterol] = useState("");
  const [hdlCholesterol, setHdlCholesterol] = useState("");
  const [triglycerides, setTriglycerides] = useState("");
  console.log(user);
const email = user.email;


const postManualEntry = async (e) => {
  if(!isAuthorized){
    toast.error("User not Authorized!");
    navigateTo('/login');
    return;
  }
  
  e.preventDefault();
  console.log("email",email);
  let url;
  let postData;

  switch (disease.toLowerCase()) {
    case "sugar":
      url = "http://localhost:4000/sugar";
      postData = {
        fastingSugar: fastingSugarData,
        randomSugar: randomSugarData,
        email: email,
        date: testDate
      };
      break;
    case "bp":
      url = "http://localhost:4000/hearthealth";
      postData = {
        systolicBP: systolicBPData,
        diastolicBP: diastolicBPData,
        heartbeat: heartBeatData,
        email: email,
        date: testDate
      };
      break;
    case "urine":
      url = "http://localhost:4000/urine";
      postData = {
        colour: urineColor,
        pH: urinepH,
        ketone: urineKetone,
        glucose: urineGlucose,
        bilirubin: urineBilirubin,
        email: email,
        date: testDate
      };
      break;
    case "lipid":
      url = "http://localhost:4000/lipid";
      postData = {
        totalCholesterol: totalCholesterol,
        ldlCholesterol: ldlCholesterol,
        hdlCholesterol: hdlCholesterol,
        tryglycerides: triglycerides,
        email: email,
        date: testDate
      };
      break;
    default:
      return;
  }

  try {
    const { data } = await axios.post(url, postData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    if (data.message) {
      toast.success(data.message);
     if(disease.toLowerCase()==='bp'){
      navigateTo('/blood-pressure-stats');
     }
     else if(disease.toLowerCase()==='sugar'){
      navigateTo('/sugar-stats');
     }
     else if(disease.toLowerCase()==='lipid'){
      navigateTo('/lipid-stats');
     }
     else if(disease.toLowerCase()==='urine'){
      navigateTo('/urine-stats');
     }
    } else if (data.error) {
      toast.error(data.error);
    }
  } catch (error) {
    console.error("Error occurred while posting manual entry:", error);
    toast.error("Failed to submit manual entry. Please try again later.");
  }
};


  const handleSugarChange = (e) => {
    const { name, value } = e.target;
    if (name === "fastingSugar") {
      setFastingSugarData(value);
    } else if (name === "randomSugar") {
      setRandomSugarData(value);
    }
  }

  const handleSystolicBPChange = (e) => {
    setSystolicBPData(e.target.value);
  }

  const handleDiastolicBPChange = (e) => {
    setDiastolicBPData(e.target.value);
  }

  const handleHeartBeatChange = (e) => {
    setHeartBeatData(e.target.value);
  }

  const handleUrineChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "color":
        setUrineColor(value);
        break;
      case "pH":
        setUrinepH(value);
        break;
      case "ketone":
        setUrineKetone(value);
        break;
      case "glucose":
        setUrineGlucose(value);
        break;
      case "bilirubin":
        setUrineBilirubin(value);
        break;
      default:
        break;
    }
  }

  const handleLipidChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "totalCholesterol":
        setTotalCholesterol(value);
        break;
      case "ldlCholesterol":
        setLdlCholesterol(value);
        break;
      case "hdlCholesterol":
        setHdlCholesterol(value);
        break;
      case "triglycerides":
        setTriglycerides(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", disease, fastingSugarData, randomSugarData, systolicBPData, diastolicBPData, heartBeatData, urineColor, urinepH, urineKetone, urineGlucose, urineBilirubin, totalCholesterol, ldlCholesterol, hdlCholesterol, triglycerides);
  }

  return (
    <div className='bodymain'>
    <div className={baseClass} style={inlineStyles}>
    <div className='entry_container'>
        <div id="heading"><h1 >Enter the medical report details manually</h1></div>
        <div className='entry_details'>
    <label htmlFor="ServiceProvider"> Service Provider Name:</label>
    <input type="text" id="ServiceProvider" name="ServiceProvider" value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)} />
  </div>
  <div  className='entry_details'>
    <label htmlFor="Date" > Test Date:</label>
    <input type="date" id="Date" name="Date" value={testDate} onChange={(e) => setTestDate(e.target.value)} />
  </div>
        <form onSubmit={postManualEntry}>
            <select className='select_disease' onChange={(e) => { setDisease(e.target.value) }}>
                <option value="">Select Disease</option>
                <option value="Sugar">Sugar</option>
                <option value="BP">Blood Pressure</option>
                <option value="Urine">Urine Test</option>
                <option value="Lipid">Lipid Profile Test</option>
            </select>
            {disease === "Sugar" && (
                <>
                    <div className='entry_details'>
                        <label htmlFor="fastingSugar"> Fasting Sugar Level:</label>
                        <input type="text" id="fastingSugar" name="fastingSugar" value={fastingSugarData} onChange={handleSugarChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="randomSugar"> Random Sugar Level:</label>
                        <input type="text" id="randomSugar" name="randomSugar" value={randomSugarData} onChange={handleSugarChange} />
                    </div>
                </>
            )}
            {disease === "BP" && (
                <>
                    <div  className='entry_details'>
                        <label htmlFor="systolicBP"> Systolic Blood Pressure:</label>
                        <input type="text" id="systolicBP" name="systolicBP" value={systolicBPData} onChange={handleSystolicBPChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="diastolicBP"> Diastolic Blood Pressure:</label>
                        <input type="text" id="diastolicBP" name="diastolicBP" value={diastolicBPData} onChange={handleDiastolicBPChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="heartBeat"> HeartBeat:</label>
                        <input type="text" id="heartBeat" name="heartBeat" value={heartBeatData} onChange={handleHeartBeatChange} />
                    </div>
                </>
            )}
            {disease === "Urine" && (
                <>
                    <div  className='entry_details'>
                        <label htmlFor="colour">Colour:</label>
                        <input type="text" id="colour" name="color" value={urineColor} onChange={handleUrineChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="pH"> pH</label>
                        <input type="text" id="pH" name="pH" value={urinepH} onChange={handleUrineChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="Ketone"> Ketone:</label>
                        <input type="text" id="ketone" name="ketone" value={urineKetone} onChange={handleUrineChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="Glucose"> Glucose:</label>
                        <input type="text" id="glucose" name="glucose" value={urineGlucose} onChange={handleUrineChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="Bilirubin"> Bilirubin:</label>
                        <input type="text" id="bilirubin" name="bilirubin" value={urineBilirubin} onChange={handleUrineChange} />
                    </div>
                </>
            )}
            {disease === "Lipid" && (
                <>
                    <div  className='entry_details'>
                        <label htmlFor="TotalCholestrol"> Total Cholesterol:</label>
                        <input type="text" id="TotalCholestrol" name="totalCholesterol" value={totalCholesterol} onChange={handleLipidChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="LDLCholesterol">LDL Cholesterol:</label>
                        <input type="text" id="LDLCholesterol" name="ldlCholesterol" value={ldlCholesterol} onChange={handleLipidChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="HDLCholesterol"> HDL Cholesterol:</label>
                        <input type="text" id="HDLCholesterol" name="hdlCholesterol" value={hdlCholesterol} onChange={handleLipidChange} />
                    </div>
                    <div  className='entry_details'>
                        <label htmlFor="Triglycerides"> Triglycerides:</label>
                        <input type="text" id="Triglycerides" name="triglycerides" value={triglycerides} onChange={handleLipidChange} />
                    </div>
                </>
            )}
            <button className="buttonbtr" type="submit">Submit</button>
        </form>
    </div>
    </div>
</div>
  );
}

export default ManualEntry;
