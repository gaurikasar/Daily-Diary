/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/signUp.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    waterGlassCount: 0,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3001/users';
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="right">
          <h2 className="h2">Welcome Back</h2>
          <Link to="/login">
            <button type="button" className="green_btn">
              Sign In
            </button>
          </Link>
        </div>
        <div className="left">
          <form className="form_container h1" onSubmit={handleSubmit}>
            <h2 className="h2">Create Account</h2>
           <label id="text">First Name :  <input
              type="text"
              id="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="input"
            /></label>
            <label id="text">Last Name :  <input
              type="text"
              id="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="input"
            /></label>
            <label id="email">User Email : <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            /></label>
            <label id="password">Password :  <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            /></label>
            {error && <div className="error_msg"> {error}</div>}
            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
