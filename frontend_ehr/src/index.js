import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js';

export const Context = React.createContext({isAuthorized:false});

const AppWrapper=()=>{

  const [isAuthorized,setIsAuthorized]=useState(false);
  const [user,setUser]=useState({});
const [bpData,setbpData]=useState([]);
const [lipidData,setLipidData]=useState([]);
const [sugarData,setSugarData]=useState([]);
const [urineData,setUrineData]=useState([]);
  return (
    <Context.Provider value={{isAuthorized,setIsAuthorized,user,setUser,bpData,setbpData,lipidData,setLipidData,urineData,setUrineData,sugarData,setSugarData}}>
   <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
