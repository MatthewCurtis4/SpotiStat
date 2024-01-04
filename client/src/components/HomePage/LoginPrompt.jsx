import React from 'react';
import {BsArrowRightCircle} from "react-icons/bs";
import "./Features.css";
import { Link } from 'react-router-dom';
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
                    <a className='item-link text-grey' href={login} > <BsArrowRightCircle size={30} /> </a>
                </div> 

                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoginPrompt