import React from 'react'
import logo from '../../Images/logo.png'
import Tilt from 'react-parallax-tilt';
import './logo.css'


const Logo = () => {


    return (
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2" style={{ height: 150, width: 150 }} >
          <div className="Tilt-inner pa3">
            <img style={{paddingTop: '5px'}} alt='logo' src={logo}/>
          </div>
        </Tilt>
      </div>
    )
}

export default Logo