import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css'; 
import Carousel from 'react-bootstrap/Carousel'; 
import img1 from '../../assests/page1.jpg';
import img2 from '../../assests/page2.jpg';
import './carousel.css'; // Import the CSS file

export default function App() { 
  return ( 
    <div className='megacontainer'>
    <div className="carousel-container"> 
      <Carousel style={{ width: '100%' }}> 
        <Carousel.Item interval={1500}> 
          <img 
            className="d-block w-100 carousel-image" 
            src={img1}
            alt="Image One"
          /> 
          <Carousel.Caption className="carousel-caption">
            <h3>Electronic Health Record</h3>
          </Carousel.Caption>
        </Carousel.Item> 
        <Carousel.Item interval={500}> 
          <img 
            className="d-block w-100 carousel-image" 
            src={img2}
            alt="Image Two"
          /> 
          <Carousel.Caption className="carousel-caption"> 
            <h3>Cutting Edge Technology</h3>
          </Carousel.Caption>
        </Carousel.Item> 
      </Carousel> 
    </div>
    </div> 
  ); 
}
