import React from 'react';
import "./Features.css";
import data from "../data";
import SingleFeature from './SingleFeature.jsx';

const Features = () => {
  return (
    <section className='features' id = "features">
        <div className='container'>
            <div className='features-content'>
                <svg height = "2em">
                </svg>

                <div className='item-list grid text-white text-center'>
                    {
                        data.features.map(feature => {
                            return (
                                <SingleFeature feature = {feature} key = {feature.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features