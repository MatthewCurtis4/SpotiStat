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
                    <h4>{"Click Here To Login"}</h4>
                    <a className='item-link text-grey' href={login} > Click </a>
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