import React from 'react';
import {BsArrowRightCircle} from "react-icons/bs";
import "./Features.css";

const SingleFeature = ({feature}) => {
  return (
    <div className='item translate-effect'>
        <span className='item-icon'>
            {feature.icon}
        </span>
        <h4 className='item-title fs-25'>{feature.title}</h4>
        <p className='fs-19 text' style={{ Height: '3em' }}>{feature.text}</p>
    </div>
  )
}

export default SingleFeature