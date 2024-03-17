import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiCrossFlare, GiCrossMark, GiCrossShield, GiCrossbow, GiCrossedAirFlows, GiCrossedChains, GiCrossroad, GiHamburgerMenu } from 'react-icons/gi';
import logo1 from "../../assests/logo.jpg";
import "./Navbar.css"; // Import CSS file
import { FaClosedCaptioning, FaCross, FaCrosshairs, FaWindowClose } from 'react-icons/fa';

function Navbar() {
    const path=window.location.pathname;
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user,setUser} = useContext(Context);
    // const navigateTo = useNavigate();
    const handleLogout = async () => {
      try{
         const { data }=await axios.get("http://localhost:4000/logout",{withCredentials:true});
      console.log("mj",data);
        if(data.message){
          toast.success(data.message);
        
          console.log(user);
          setUser({});
          setIsAuthorized(false);
         }
         else if(data.error){
           toast.error(data.error);
         }
       
      }catch(error){
       const errorMessageRegex = /<pre>(.*?)(?=<br>)/s;
      const match = errorMessageRegex.exec(error.response.data);
      toast.error(match[1].trim());
      }
          }
    console.log(path);

    return (
        <div>
      <>
        <nav>
            <div className='nav_container'>
                <div className='logo'>
                    <img src={logo1} alt='logo' />
                </div>
                <ul className={`navbar-content ${show ? "show" : ""}`}> 
                <div>
                  <li>
                        <Link to={"/"} onClick={() => setShow(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/book-a-test"} onClick={() => setShow(false)}>Book a Test</Link>
                    </li>
                    
                            <li>
                                <Link to={"/ManualEntry"} onClick={() => setShow(false)}>
                                   Manual Entry
                                </Link>
                            </li>
                            <li>
                                <Link to={"/serviceProvider"} onClick={() => setShow(false)}>
                                   Service Provider
                                </Link>
                            </li>
                            <div className='viewReport'>
                                <li>View Report</li>
                                <ul className='dropDown'>
                                    <li><Link to={'/blood-pressure-stats'}  onClick={() => setShow(false) }>Blood Pressure</Link></li>
                                    <li><Link to={'/sugar-stats'}  onClick={() => setShow(false)}>Sugar</Link></li>
                                    <li><Link to={'/lipid-stats'}  onClick={() => setShow(false)}>Lipid</Link></li>
                                    <li><Link to={'/urine-stats'} onClick={() => setShow(false)} >Urine</Link></li>
                                </ul>
                            </div>
                            </div>
                    <div className='authorization'>  
                   {!isAuthorized?<div className='login-signup'><Link to={"/login"} className='login'>Login</Link>
                   <Link to={"/register"}>SignUp</Link>
                   </div>: <button onClick={handleLogout}>LOGOUT</button>}
                   </div>  
                </ul>
                <div className='hamburger'>
                   {!show? <GiHamburgerMenu onClick={() => setShow(!show)} /> :<FaWindowClose  onClick={() => setShow(!show)} />
                     }  </div>
            </div>
        </nav>
    </>
        
        </div>
    )
}

export default Navbar;
