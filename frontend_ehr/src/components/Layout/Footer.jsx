import React, { useContext } from 'react';
import { Context } from '../..';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const { isAuthorized } = useContext(Context);
const path =window.location.pathname;
console.log(path);
  return (
    <div>
    {(path==="/register"||path==="/login")?<></>:<footer className='footer'>
      <div>&copy; All Rights Reserved</div>
      <div>
        <a href='#' target='_blank'><FaFacebook /></a>
        <a href='#' target='_blank'><FaGithub /></a>
        <a href='#' target='_blank'><FaLinkedin /></a>
        <a href='#' target='_blank'><FaInstagram /></a>
      </div>
    </footer>}
    </div>
  );
}

export default Footer;
