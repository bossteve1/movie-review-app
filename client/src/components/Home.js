import React, { useEffect, useState }  from "react"
import Login from './Login';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import {  Container, Row, Col, } from "react-bootstrap"
import MovieCard from './MovieCard'

const Home = ({user, setUser}) => {
  const history = useNavigate()
  const [movies, setMovies] = useState([]);

  function handleLogoutClick() {
    history(`/login`)
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    
} 


useEffect(() => {
  fetch("/movies")
    .then((r) => r.json())
    .then((movies) => setMovies(movies));
}, []);

  console.log(movies);
  
  if (!user) return <Login />;
  return (

    <div>
          <Nav className='button'>
      <Nav.Item>
        <Nav.Link onClick={()=> history(`/`)}>MovieReview</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={()=> history(`/`)}>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
      </Nav.Item>
      <Nav.Item>

      </Nav.Item>
    </Nav>

    <div className='Home text-center'>
           <p className=' hit text-center fw-bold title'>
            Hit <br/> or <br/>Miss
           </p> 
           <p className=' find text-center fs-3'>
              review your favorite kenyan movies
           </p> 
          
          </div>

          <Container>
             <Row>
             {movies? movies.map((movie) => (
            <Col xs={12} md={4}className='p-5'>
            <MovieCard  movie={movie} key={movie.id}/>
            </Col>
             )): null}
            

            </Row>
          </Container>
      
    </div>
  )
}

export default Home