import React from 'react';
import "./Features.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
const login = process.env.REACT_APP_PORT_BE || 'http://localhost:8888/login';


const LoginPrompt = () => {
  return (
    <section className='options'>
        <div className='container'>
            <div className='features-content'>
                <svg height = "2em">
                </svg>

                <div className='vert-list'>
                    {
                    <div className='option '>
                    <a className='item-link text-grey' href={login} > <h4>{"Login to Spotify"}</h4> </a>
                </div> 
                // <FontAwesomeIcon icon={faArrowRight} size="2x"/>
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoginPrompt