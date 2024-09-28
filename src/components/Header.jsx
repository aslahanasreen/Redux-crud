import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-brands fa-blogger-b fa-xl" style={{color: "#B197FC",}} />
           {' '}
            BlogSpot
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header