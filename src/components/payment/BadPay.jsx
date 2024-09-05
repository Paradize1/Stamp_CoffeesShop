import React from 'react';


import './Pay.css'


const BadPay = () => {

    const handleTryAgain = () => {
        window.history.back();
    };

    const handleStopPay = () => {
        window.location.href = '/main';
    };



    return (
      <div className="BadPay">ERROR
        <div className='Bad_img'>
            <div className='badeclipse'>
                <div className='badx'></div>
            </div>
        </div>
        <div className='BadText'>Оплата не прошла</div>
        <div className='TryAgain' onClick={handleTryAgain}>Попробовать ещё раз</div>
        <div className='CanselButton' onClick={handleStopPay}>Отмена</div>
      </div>
    );
  };
  
  export default BadPay;