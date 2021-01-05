import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import bgimage from '../therapist-hero.jpg';
const Home = (props) => {
  return (
    <div>
      <Jumbotron
        fluid
        className='hero-banner'
        style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}
      >
        <Container fluid>
          <h1 className='display-3 text-secondary hero-banner__header'>
            Clear Skies
          </h1>
          <p className='lead hero-banner__paragraph text-secondary'>
            Peace of mind. For connecting mental health professionals with their
            patients.
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
