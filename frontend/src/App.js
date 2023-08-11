import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Header from './component/header';
import RegistrationForm from './component/registration';
import Home from './component/home';
// import Main from './component/demo';
import UserContextProvider from './component/Context/userContext';
import Demo from './component/demo';
import Test from './component/test';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={ <RegistrationForm/>}/>
        <Route path='/demo' element={<Demo/>}/>
        <Route path='/test' element={<Test/>}/>
      
      </Routes>
      </BrowserRouter>
      </UserContextProvider>
      
    </div>
  );
}

export default App;
