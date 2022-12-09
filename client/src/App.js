// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import SingleMovie from './components/SingleMovie'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

  }, []);
 
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser}/>} exact />
      <Route path="/login" element={<Login setUser={setUser}/>}exact/>
      <Route path="/signup" element={<Signup />}exact />
      <Route path="/movies/:id" element={<SingleMovie user={user}/>}exact />    

    </Routes>
    </div>
   
  </BrowserRouter>
  );
  
}

export default App;
