import React from 'react'
import { useState,useEffect } from 'react';
function Demo() {
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [role, setRole] = useState(""); 
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);

//for editing a user state declaration

const [editUserId, setEditUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");



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
      // setForm(false);
      console.log(name1, email1, password1, role);

      if (response.status === 200) {
        setMsg("Registration Sucessful");
        fetchUsers();
      } else {
        setMsg("Registartion Failed");
      }
    }
  
  };



  //fetching all the data
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users');
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    useEffect(()=>{
      fetchUsers()
    },[])
  
    
 
  

console.log(users)


const DeleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      // Remove the deleted user from the users state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } else {
      console.error('Error deleting user:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};



 // Edit user
 const EditUser = (userId) => {
  const userToEdit = users.find(user => user._id === userId);
  setEditUserId(userId);
  setEditedName(userToEdit.name);
  setEditedEmail(userToEdit.email);
};

const SaveEdit = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editedName, email: editedEmail }),
    });

    if (response.status === 200) {
      // Update the edited user's data in the state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId
            ? { ...user, name: editedName, email: editedEmail }
            : user
        )
      );
      setEditUserId(null);
    } else {
      console.error('Error updating user:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

  return (
    <div className='demo'>
      <div>
      <h2>Demo Admin Panel</h2>
      <div className="regi">
          <h4>Register a User</h4>
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
              </select>
            </div>

            <div className="btn">
              <button type="submit">Register</button>
            </div>
          </form>
          <div>
            
         </div>
          <p style={{ color: "red" }}>{msg}</p>
        </div>
      </div>

      <div>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <button onClick={() => SaveEdit(user._id)}>Save</button>
                  ) : (
                    <div className='btn'>
                      <button onClick={() => EditUser(user._id)}>Edit</button>
                      <button onClick={() => DeleteUser(user._id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
       </div>
  )
}

export default Demo;










