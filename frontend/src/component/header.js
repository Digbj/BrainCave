import React, { useEffect } from "react";
import { UserContext } from "./Context/userContext";
import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";

const Header = () => {
  const { setInfo, info } = useContext(UserContext);
  const user = info?.name;
//   console.log(info?.role)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/myprofile", {
          credentials: "include"
        });
        if (response.ok) {
          const userInfo = await response.json();
          setInfo(userInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!info) {
      fetchData();
    }
  }, [info, setInfo]); // Adding info and setInfo as dependencies

  const logout = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include"
    });
    setInfo(null);
  };

  if (info === null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="head">
     <Link to='/'><h2 className="title">Admin</h2></Link> 
      <div className="btn">
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/register" className="btn">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
