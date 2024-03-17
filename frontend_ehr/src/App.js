import React ,{useEffect,useContext} from 'react';
import "./App.css";
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import { Context } from './index.js';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Footer from './components/Layout/Footer.jsx';
import Home from './components/Home/Home.jsx';
import Error from './components/NotFound/Error.jsx';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ServiceProvider from './components/ServiceProvider/ServiceProvider.jsx';
import ManualEntry from './components/ManualEntry/ManualEntry.jsx';
// import  Chart from './components/chart/Chart.js';

import NearCenter from './components/nearCenter/nearCenter.jsx'
import BloodPressureChart from './components/chart/BloodPressureChart.jsx';
import SugarLevelChart from './components/chart/SugarLevelChart.jsx';
import LipidChart from './components/chart/Lipid.jsx';
import Urine from './components/chart/Urine.jsx';
import BookATest from './components/BookATest/BookATest.jsx';
const App =()=>{
const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

// useEffect(()=>{
//   const fetchuser =async()=>{
//    try{ const response=await axios.get("http://localhost:4000/getuser",{withCredentials:true});
//    console.log(response);
//    if(response.data.message){
//     setUser(response.data.email);
//     setIsAuthorized(true);
//    }else if(response.data.error){
//     toast.error(response.data.error);
//     setIsAuthorized(false);
//    }
//   }
// catch(error){
//     setIsAuthorized(false);
//   }
  
// }
// fetchuser();
// },[isAuthorized]);

//  console.log(user);
  return (
    <>
      <Router>
         <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path='/manualEntry' element={<ManualEntry />} />
          <Route path='/serviceProvider' element={<ServiceProvider />} />
          <Route path='/book-a-test' element={<BookATest />} />
          
          <Route path='/blood-pressure-stats' element={<BloodPressureChart />} />
          <Route path='/near-center' element={<NearCenter />} />
          <Route path='/sugar-stats' element={<SugarLevelChart />} />
          <Route path='/lipid-stats' element={<LipidChart />} />
          <Route path='/urine-stats' element={<Urine />} />
          <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
        <Toaster />
      </Router>
      </>
  )
}

export default App
