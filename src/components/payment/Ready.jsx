import React from 'react';
import './Pay.css';

const Ready = () => {
   
    const handleClick = () => {
        window.location.href = '/main';
      };


    return (
        <div className="Ready" onClick={handleClick}>
            <div className='Ready_img'></div>
            <div className='ReadyText1'>Напиток готов!</div>
            <div className='ReadyText2'>вы можете забрать его</div>
        </div>
          
    );
};

export default Ready;