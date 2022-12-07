import React from 'react'
import Login from './Login';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';


const Home = ({user, setUser}) => {
  const history = useNavigate()

  function handleLogoutClick() {
    history(`/login`)
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    
} 

  console.log(user);
  if (!user) return <Login />;
  return (

    <div>
          <Nav
      activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link >Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
      </Nav.Item>
      <Nav.Item>

      </Nav.Item>
    </Nav>
      
    </div>
  )
}

export default Home