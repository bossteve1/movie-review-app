import React from 'react'
import { Button, Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie}) => {
  let navigate=useNavigate()

  return (
    <div>



  <Card style={{ width: '18rem' }}>
    <Card.Img height="200" variant="top" src={movie.image_url} />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Button onClick={() => {navigate (`/Movies/${movie.id}`)} }  type="button" className="btn btn-success button mt-3">view Movie</Button> 
    </Card.Body>
  </Card>  




    </div>
  )
}

export default MovieCard