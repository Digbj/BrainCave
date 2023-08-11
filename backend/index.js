//mongodb+srv://abcd:abcd@adminpage.ae8uwbt.mongodb.net/
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const user=require('./Schema/user')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

const app=express();

const salt = bcrypt.genSaltSync(10);
const secret='jhuhebfcueb78687sd7c7s6t76t6';
app.use(cors({credentials:true,origin:'http://localhost:3000'} ));
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://abcd:abcd@adminpage.ae8uwbt.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  //registration
  app.post('/reg', async (req, res) => {
    const { name1, email1, password1,role } = req.body;
    try {
      const existingUser = await user.findOne({ email:email1 });
  
      if (existingUser) {
        res.status(400).json('User already exists');
      } else {
        const userDet = await user.create({ name:name1, email:email1, password:bcrypt.hashSync(password1,salt),role:role, });
        res.json(userDet);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });


   //Login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const userDet = await user.findOne({ email });
  
      if (!userDet) {
        res.status(400).json('User not found');
        return;
      }
  
      const pass = bcrypt.compareSync(password, userDet.password);
  
      if (pass) {
        jwt.sign({name:userDet.name, email, id: userDet._id}, secret, {}, (error, token) => {
          if (error) throw error;
  
          // Set the cookie in the response header
          res.cookie('token', token).json({ message: 'Cookie set successfully',id:userDet._id,name:userDet.name,role:userDet.role});
        });
      } else {
        res.status(400).json('Wrong credentials');
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });

//Logout
  app.post('/logout',(req,res)=>{
    res.cookie('token','').json('Loged Out')
  })

//my profile
app.get('/myprofile', (req, res) => {
    const { token } = req.cookies;
  
    if (!token) {
      // Handle the case when the token is missing or not provided
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  
    jwt.verify(token, secret, {}, (error, details) => {
      if (error) {
        // Handle the case when the token is invalid or expired
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
  
      // Send the user details as the response
      res.json(details);
      console.log(details)
    });
  });



  //access att the users
  app.get('/users', async (req, res) => {
    try {
      const users = await user.find({}, '_id name email');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  });



  // Update a user by ID
app.put('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, role } = req.body;
  
      const updatedUser = await user.findByIdAndUpdate(userId, { name, email, role }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  });
  

  // Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await user.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  });


  app.put('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { task } = req.body;
  
    try {
      const updatedUser = await user.findByIdAndUpdate(userId, { task }, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user task' });
    }
  });
  
  
  
  


  app.listen(8000,()=>{
    console.log("app is listning at 8000")
})