import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


function Signup({onLogin}) {
  const history = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");  

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email: email
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(()=> history(`/`));
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
  }

  return (
    <div className='background'>
      <p className='title'>MovieReview</p>
      <Form onSubmit={handleSubmit} className='shadow-lg p-3 mx-5 mt-5 rounded form'>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" placeholder="enter user name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>
        
        <Button className='button' variant="primary" type="submit">
          Submit
        </Button>
        <p>Already have an account? <span onClick={()=> history(`/login`)}>Log in</span></p>
      </Form>
    </div>

  )
}

export default Signup