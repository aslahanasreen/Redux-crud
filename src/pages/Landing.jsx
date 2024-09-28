import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
        <div className='container-fluid' style={{height:'90vh'}}>
               
                    <img src="https://images.pexels.com/photos/3601081/pexels-photo-3601081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                     alt="" height={'600px'} width={'100%'}/>
                     <div className='d-grid'>
                        <Link to={'/home'} className='btn btn-secondary'>Let's Explore....</Link>
                    </div>
            
        </div>  
    </>
  )
}

export default Landing