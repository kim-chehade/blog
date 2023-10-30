import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("/auth/register", inputs)
            navigate("/login");
        }catch(err){
            setError(err.response.data);
        }
    };

    

    return (
        <div className="authentication register">
            <form className="form" action="">
                <h1>Register</h1>
                <input required type="text" placeholder="First Name" name="first_name" onChange={handleChange} />
                <input required type="text" placeholder="Last Name" name="last_name" onChange={handleChange} />
                <input required type="text" placeholder="Username" name="username" onChange={handleChange} />
                <input required type="email" placeholder="Email" name="email" onChange={handleChange} />
                <input required type="password" placeholder="Password" name="password" onChange={handleChange} />
                <button className="bn632-hover bn20" onClick={handleSubmit}>Register Now</button>
                {err && <p>{err}</p>}
                <span>
                    Do you have an account?
                    <br />
                    <Link to="/login">login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
