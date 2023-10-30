import React, { useContext } from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";

const Header = () =>{
    const { currentUser, logout } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
          await logout(); // Call the logout function from AuthContext
        } catch (error) {
          // Handle any potential errors here
          console.error("Error during logout:", error);
        }
      };
        return(
            <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?category=art">
                        <h6>Art</h6>
                        </Link>
                    <Link className="link" to="/?category=science">
                        <h6>Science</h6>
                        </Link>
                    <Link className="link" to="/?category=technology">
                        <h6>Technology</h6>
                        </Link>
                    <Link className="link" to="/?category=cinema">
                        <h6>Cinema</h6>
                        </Link>
                    <Link className="link" to="/?category=food">
                        <h6>Food</h6>
                        </Link>
                    <Link className="link" to="/?category=others">
                        <h6>Others</h6>
                        </Link>

                    <span>{currentUser?.first_name}</span>
                    {currentUser ? (
                        <span onClick={handleLogout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                        Login
                        </Link>
                    )}                    <span className="create">
                        <Link className="btn" to="create">Create a Blog</Link>    
                    </span>

                </div>
            </div>
        </div>
        )
    }


export default Header;