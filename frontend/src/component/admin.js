import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './Context/userContext';
import { useContext } from 'react';
const AdminLogin=()=> {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg,setMsg]=useState('');

  const {setInfo}=useContext(UserContext);


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!email||!password){
      setMsg("Fill All The Credentials")
    }else{
        e.preventDefault();
        const response= await fetch('http://localhost:8000/login',{
             method:'POST',
             body:JSON.stringify({email,password}),
             headers:{'Content-Type':'application/json'},
             //including the cookies in req header
             credentials:'include'
           });
           setMsg("");
        setEmail("");
        setPassword("");
       
        console.log(email, password);
     
           if(response.status===200){
            response.json().then(userInfo=>{
  setInfo(userInfo)
            })
           
            
             setMsg("Login Sucessful");
           }else{
             setMsg("Wrong Cradential");
           }
    }
    
   
  };

  if(msg==="Login Sucessful"){
    return <Navigate to='/main'/>
  }

  return(
  <div className='regi'>
    <h2>Login</h2>
     <form className='regi1' onSubmit={handleSubmit}>
  <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
  <input type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
 
<div className='btn'>
<button type="submit">Login</button>

</div>
</form>
<div>
            <span>New User </span>
           <Link to='register' ><span> Register</span></Link>
        </div>
        <p style={{color:'red'}}>{msg}</p>
</div>
  )
}

export default AdminLogin;
