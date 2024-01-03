import React from 'react';
import data from "../data";
import {BsArrowRightCircle} from "react-icons/bs";
import "./Features.css";
import { Link } from 'react-router-dom';

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
                    <Link to="/" className='item-link text-grey'>
                        <BsArrowRightCircle size={30} />
                    </Link>
                </div> 

                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoginPrompt