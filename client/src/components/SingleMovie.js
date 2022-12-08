import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Nav} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const SingleMovie = ({user, setUser}) => {
  const history = useNavigate()

  const {id}= useParams();
  const [movie, setMovie] = useState([])
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleLogoutClick() {
    history(`/login`)
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    
} 
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        movie_id: movie.id,
        comments: comments,
        rating: rating
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => alert(data));
      } else {
        r.json().then((err) => alert(err.errors));
      }
    });
    setShow(false)
  }
  


  useEffect(() => {
    fetch(`/movies/${id}`)
      .then((r) => r.json())
      .then((movie) => setMovie(movie));
  }, []);


  return (
    <div>          
      <Nav
    activeKey="/home">
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
      <Container>
      <Row>
        <Col xs={12} md={6}>
          <img src={movie.image_url} className="img-thumbnail shadow-lg"></img>
        </Col>
        <Col xs={12} md={6} className='mt-5'>
        <p>Title: {movie.title}</p>
        <p>Description: {movie.description}</p>
        <p>Duration: {movie.movie_length}</p>
        <p>Director: {movie.director}</p>
        <Button onClick={handleShow}  type="button" className="btn btn-success mt-3">Add Review</Button> 

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Review</Form.Label>
        <Form.Control type="text" placeholder='Enter review' value={comments} onChange={(e) => setComments(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </Modal.Body>
      </Modal>
        </Col>
      </Row>
      <Row>
        Reviews : 
        {
          movie.reviews ? movie.reviews.map(review => (
            <p>Review: {(Object.values(review).map((review)=>(
              (review)
            )))}</p>
              
          ) ) : null
          
        }
      </Row>
     </Container>
    </div>
  )
}

export default SingleMovie