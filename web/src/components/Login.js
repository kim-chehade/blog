import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

function Login(){
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const {login} = useContext(AuthContext);
    
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
          await login(inputs)
          navigate("/");
        } catch (err) {
          setError(err.response.data);
        }
      };

    return(
        <div className="authentication login">
            <form className="form" action="">
                <h1>Login</h1>
                <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
                 {err && <p>{err}</p>}
                <button className="bn632-hover bn20" onClick={handleSubmit}>Login</button>  
                <span>
                    Don't you have an account? 
                    <br />
                    <Link to="/register">Register Now</Link>
                </span>
            </form>
        </div>
    )
}


export default Login;