import { useState } from "react";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Link,
} from "react-router-dom";
import Signup from "./Signup";
import Main from "./Main";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [visitMain, setVisitMain] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    localStorage.setItem("email", data.email);
    //localStorage.setItem("firstName", data.firstName);
    //console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      //localStorage.setItem("token", res.data);
      setVisitMain(true);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  const handleSignUp = () => {
    <Router>
      <Route exact path="/" component={Signup} />
    </Router>;
  };

  return (
    <>
      {visitMain && <Main />}
      {!visitMain && (
        <div className="login_container">
          <div className="login_form_container">
            <div className="left">
              <form className="form_container" onSubmit={handleSubmit}>
                <h1 className="h1">DAILY DIARY</h1>
                <h2 className="h2">Login to Your Account</h2>
                <label for="email">User Email  : <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="input"
                /></label>
                <label id="password">Password :   <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="input"
                /></label>
                {error && <div className="error_msg">{error}</div>}
                <button type="submit" className="green_btn">
                  Sign In
                </button>
              </form>
            </div>
            <div className="right">
              <h1>New Here?</h1>
              <Link to="/signup">
                <button type="button" className="green_btn">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default Login;
