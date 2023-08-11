import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { UserContext } from "./Context/userContext";
import { useContext } from "react";
const RegistrationForm = () => {
  //registeration
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [role, setRole] = useState(""); 
  const [msg, setMsg] = useState("");

  //login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setInfo,info } = useContext(UserContext);

  const [form, setForm] = useState(true);
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmitR = async (e) => {
    e.preventDefault();
    if (!name1 || !email1 || !password1 || !role) {
      setMsg("Fill All The Credentials");
    } else {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/reg", {
        method: "POST",
        body: JSON.stringify({ name1, email1, password1, role }),
        headers: { "Content-Type": "application/json" },
      });
      setMsg("");
      setName1("");
      setEmail1("");
      setPassword1("");
      setForm(false);
      console.log(name1, email1, password1, role);

      if (response.status === 200) {
        setMsg("Registration Sucessful");
      } else {
        setMsg("Registartion Failed");
      }
    }
  };

  const handleSubmitL = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Fill All The Credentials");
    } else {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        //including the cookies in req header
        credentials: "include",
      });
      setMsg("");
      setEmail("");
      setPassword("");

      console.log(email, password);

      if (response.status === 200) {
        response.json().then((userInfo) => {
          setInfo(userInfo);
        });

        setMsg("Login Sucessful");
      } else {
        setMsg("Wrong Cradential");
      }
    }
  };

  if (info?.role === "demo") {
    return <Navigate to="/demo" />;
  }else if(info?.role==='test'){
    return <Navigate to='/test'/>
  }

  return (
    <>
      {form ? (
        <div className="regi">
          <h2>Registraion Form</h2>
          <form className="regi1" onSubmit={handleSubmitR}>
            <input
              type="text"
              placeholder="Name..."
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email..."
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <div>
              <label>Select Role:</label>
              <select value={role} onChange={handleRoleChange}>
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="test">Test</option>
                <option value="demo">Demo</option>
              </select>
            </div>

            <div className="btn">
              <button type="submit">Register</button>
            </div>
          </form>
          <div>
            <span>Already Registered </span>
            <span className="tog" onClick={() => setForm(false)}>
              {" "}
              Login
            </span>
          </div>
          <p style={{ color: "red" }}>{msg}</p>
        </div>
      ) : (
        <div className="regi">
          <h2>Login</h2>
          <form className="regi1" onSubmit={handleSubmitL}>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
          <div>
            <span>New User </span>
            <span className="tog" onClick={() => setForm(true)}>
              {" "}
              Register
            </span>
          </div>
          <p style={{ color: "red" }}>{msg}</p>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
