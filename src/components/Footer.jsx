import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div className='container-fluid'>
            <Row>
                <Col>
                    <h3>BlogSpot</h3>
                    <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quibusdam odio vel accusamus fugit doloremque molestias, eligendi, laudantium dolorum velit nulla, quod eveniet dolores ipsum ab laborum similique ullam unde?</p>
                </Col>
                <Col>
                    <h3>Links</h3>
                    <div className='d-flex flex-column'>
                        <Link to={'/'}>Landing</Link>
                        <Link to={'/home'}>Home</Link>
                    </div>
                </Col>
                <Col>
                    <h3>Feedback</h3>
                    <input type="text" className='form-control'/>
                    <button className='btn btn-info'>Send</button>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default Footer