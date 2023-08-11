import React, { useState, useEffect } from "react";

const Test = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          console.error("Error fetching users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const EditTask = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, isEditing: true, editedTask: user.task };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const SaveTask = async (userId) => {
    const userToUpdate = users.find((user) => user._id === userId);
     // Handle if user is not found it wiill return
    if (!userToUpdate) return;
    
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: userToUpdate.editedTask }), 
      });
  
      if (!response.ok) {
        console.error("Error updating task:", response.statusText);
      } else {
        // Update the local state after successful API update
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, task: userToUpdate.editedTask, isEditing: false } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  

  console.log(users);

  return (
    <div className="tab">
      <h2>User List</h2>
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
  <tr key={user._id}>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>
      {user.isEditing ? (
        <input
          type="text"
          value={user.editedTask}
          onChange={(e) => {
            const updatedUsers = users.map((u) =>
              u._id === user._id
                ? { ...u, editedTask: e.target.value }
                : u
            );
            setUsers(updatedUsers);
          }}
        />
      ) : (
        <span>{user.task}</span>
      )}
    </td>
    <td className="btn">
      {user.isEditing ? (
        <button onClick={() => SaveTask(user._id)}>Save</button>
      ) : (
        <button onClick={() => EditTask(user._id)}>Edit</button>
      )}
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default Test;
