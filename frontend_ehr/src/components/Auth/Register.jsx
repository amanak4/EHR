import axios, { isAxiosError } from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaLock, FaPencilAlt, FaPeopleArrows, FaPeopleCarry, FaPersonBooth, FaSign, FaSignOutAlt} from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../..';
import logo1 from "../../assests/logo.jpg";
import photo1 from "../../assests/auth.png";
function Register() {

  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  const [showPassword,setShowPassword]=useState(false);
  const [passType,setpassType]=useState('password');
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const showpass=()=>{
      if(!showPassword){
          setpassType('text');
      }
      else{
        setpassType('password');
      }
      setShowPassword(!showPassword);

    }
    const handleRegister=async (e)=>{
      e.preventDefault();
try{
  console.log("mja");
  console.log("email",email);
    const {data}=await axios.post("http://localhost:4000/register",{email,password,name},{withCredentials:true,
  headers:{
    "Content-Type":"application/json",
  },});

  console.log("ajs",data);
  if(data.message){
   toast.success(data.message);
   setUser(data.user);
   console.log(user);
   setname("");
   setemail("");
   setpassword("");
   setIsAuthorized(true);
  }
  else if(data.error){
    toast.error(data.error);
  }

   
   
}catch(error){
  // console.log("afghj",error.response.data.message);
  // console.log(error);
// 
  const errorMessageRegex = /<pre>(.*?)(?=<br>)/s;
const match = errorMessageRegex.exec(error.response.data);
toast.error(match[1].trim());


}
    }
    if(isAuthorized){
        return <Navigate to={"/"} />
    }
  return (
    <div className='authPage'>
      <div className='container'>
        <div className='header'>
          <FaSignOutAlt />
          <h3>Create account!</h3>
        </div>
        <form >
            
             <h2>Register As</h2>
           
            <div className='inputTag'>
             <label>Name <FaPencilAlt /></label>
             <div>
             
              <input type='text' value={name} onChange={(e)=>setname(e.target.value)} placeholder='Aman'/>
             
             </div>
            </div>
            <div className='inputTag'>
             <label>Email <MdOutlineMailOutline /></label>
             <div>
              <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='aman@gmail.com'/>
             
             </div>
            </div>
            <div className='inputTag'>
             <label>Password <FaLock /></label>
             <div className='password_detail'>
              <input type={passType} value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='munna123@'/>
                         
                          <div onClick={showpass} className='eye'>{showPassword?<FaEye />:<FaEyeSlash />}</div>
                          </div>

            </div>
            <button onClick={handleRegister} className="button" type='submit'>Register</button>
            <Link to={'/login'}>Login Now</Link>
        </form>
      </div>
      <div className='banner'>
      <img src={photo1} alt='munna'/>
      </div>
    </div>
  )
}

export default Register
