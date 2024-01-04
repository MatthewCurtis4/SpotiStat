import React from 'react';
import "./Features.css";

const SingleFeature = ({feature}) => {
  return (
    <div className='item translate-effect'>
        <span className='item-icon'>
            {feature.icon}
        </span>
        <h4 className='item-title fs-25'>{feature.title}</h4>
        <p className='item-text' style={{ Height: '3em' }}>{feature.text}</p>
    </div>
  )
}

export default SingleFeature