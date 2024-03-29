import React from 'react';
import data from "../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import "./Features.css";
import { Link } from 'react-router-dom';

const SearchOptions = () => {
  return (
    <section className='options'>
        <div className='container'>
            <div className='features-content'>
                <svg height = "2em">
                </svg>

                <div className='vert-list'>
                    {
                        data.typesOfSearchs.map(functionOption => {
                            return (
                                <div className='option'>
                                <Link to={functionOption.location} className='item-link'>
                                <h4>{functionOption.title}</h4>
                                </Link>
                            </div> 
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default SearchOptions