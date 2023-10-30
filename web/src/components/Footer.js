import React from "react";
import Logo from "../images/footer-logo.png";

const Footer = () => {

  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        &copy; {new Date().getFullYear()} Copyright:{' '} Done by Karim Chehade.
      </span>
    </footer>
  )
}


export default Footer;