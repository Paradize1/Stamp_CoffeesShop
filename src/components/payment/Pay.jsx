import React, { useState, useEffect } from 'react';
import './Pay.css';
import CardPayment from './CardPay';
import CashPayment from './CashPay';

const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const storedPrice = localStorage.getItem('price');
    if (storedPrice) {
      setPrice(storedPrice);
    }
  }, []);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleBackToSelection = () => {
    setPaymentMethod(null);
  };

  const renderPaymentContent = () => {
    if (paymentMethod === 'card') {
      return <CardPayment price={price} onBack={handleBackToSelection} />;
    } else if (paymentMethod === 'cash') {
      return <CashPayment price={price} onBack={handleBackToSelection} />;
    } else {
      return (
        <div className="payment-selection">
          <div className="back" onClick={handleBack}>
            <div className="back_arrow"></div>
            Назад
          </div>
          <div className="payment-option" onClick={() => handlePaymentMethodSelect('card')}>Оплата картой</div>
          <div className="payment-option" onClick={() => handlePaymentMethodSelect('cash')}>Оплата наличными</div>
        </div>
      );
    }
  };

  return (
    <div className="Pay">
      {renderPaymentContent()}
    </div>
  );
};

export default Pay;