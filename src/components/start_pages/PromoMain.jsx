import React, { useState, useEffect } from'react';
import Promo1 from '../start_pages/Promo_1/Promo_1';
import Promo2 from '../start_pages/Promo_2/Promo_2';
import Promo3 from '../start_pages/Promo_3/Promo_3';

import './PromoMain.css';

const PromoMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [promoComponents, setPromoComponents] = useState([
    <Promo1 key="promo1" />,
    <Promo2 key="promo2" />,
    <Promo3 key="promo3" />,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % promoComponents.length);
    }, 10000); // время между переходами
    return () => clearInterval(intervalId);
  }, [promoComponents]);


  const handleClick = () => {
    window.location.href = '/main';
  };

  return (
    <div className="promo-container">
      <div className="promo-carousel">
        {promoComponents.map((component, index) => (
          <div
            key={index}
            className={`promo-carousel-item ${activeIndex === index? 'active' : ''}`}
            onClick={handleClick}
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoMain;