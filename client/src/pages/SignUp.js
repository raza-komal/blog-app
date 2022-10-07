import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const SignUp = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignuUp] = useState(true);
  const switchForm = () => {
    setIsSignuUp((prev) => !prev);
  };

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errmsg, setErrMsg] = useState("");

  const { login, signup } = useContext(AuthContext);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("clicked");
    try {
     if(!isSignUp){
      await login(data);
      navigate('/')
     }
     else{
      await signup(data);
      navigate('/')
     }
    } catch (error) {
      setErrMsg(error.response.data);
    }

    // await axios.post("http://localhost:3400/users/signup", data).then(res => console.log("first", res)).catch(err => console.log(err))
  };
  return (
    <div className="auth">
      <h2>{isSignUp ? "Create Acccount" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <label htmlfor="username">UserName</label>

            <input
              required
              type="text"
              placeholder="Enter Username"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </>
        )}
        <label for="email">Email</label>
        <input
          required
          type="email"
          placeholder="Provide Email Address"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label for="password">Password</label>

        <input
          required
          type="password"
          placeholder=""
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit">{isSignUp ? "Create Account" : "Sign in"}</button>
        {errmsg && <p>{errmsg}</p>}
        {isSignUp ? (
          <p onClick={switchForm}>Already have an account? Sign in</p>
        ) : (
          <p onClick={switchForm}>Don't have an Acccount? Sign up</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
