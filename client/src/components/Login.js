import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login({onLogin}) {
  const history = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation()
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(()=> history(`/`));
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
  }

  return (
    <div>
      <p className='title'>MovieReview</p>
        <Form onSubmit={handleSubmit} className='shadow-lg p-5 m-5  rounded form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" placeholder="Enter userName" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>

        <Button className='button' variant="primary" type="submit">
          Submit
        </Button>
        <p>Don't have an account? <span onClick={()=> history(`/signup`)}>Sign up</span></p>
      </Form>
    </div>
    
  );
}

export default Login;