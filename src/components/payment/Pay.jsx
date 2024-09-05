import React, { useState, useEffect } from 'react';
import './Pay.css';

import emulator from './Emulator';



const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState(null); // Состояние для выбора способа оплаты
  const [cashAmount, setCashAmount] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const storedPrice = localStorage.getItem('price');
    if (storedPrice) {
      setPrice(storedPrice);
    }
  }, []);

  console.log(price)


  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleStopPay = () => {
    window.location.href = '/main';
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleBackToSelection = () => {
    setPaymentMethod(null);
  };

  const handleStartCashin = () => {
    // Запускаем эмуляцию приёма наличных
    emulator.StartCashin((amount) => {
      setCashAmount((prevAmount) => prevAmount + amount);
    });
  };

  const handleStopCashin = () => {
    // Останавливаем эмуляцию приёма наличных
    emulator.StopCashin(() => {
      console.log('Cashin stopped');
    });
  };
  const handleBankCardPurchase = () => {
    // Эта функция может быть оставлена пустой или удалена
    console.log('Payment by card is not supported in cash payment mode.');
  };



  const renderPaymentContent = () => {
    if (paymentMethod === 'card') {
      return (
        <div className="card-payment">
          <div className='back_to_selection' onClick={handleBackToSelection}>Назад</div>
          <div className="card_img"></div>
          <div className="card_pay_text">Приложите карту <br /> к терминалу</div>
          <div className='total_to_pay_text'>К оплате : {price}₽</div>
          <div className="stop_pay_button" onClick={handleStopPay}>Отмена</div>
        </div>
      );
    } else if (paymentMethod === 'cash') {
      return (
        <div className="cash-payment">
          <div className='back_to_selection' onClick={handleBackToSelection}>Назад</div>
          <div className="cash_pay_text">Вставьте купюры <br /> в купюроприемник</div>
          <div className="stop_pay_button" onClick={handleStopPay}>Отмена</div>
          <button onClick={handleStartCashin}>Начать приём наличных</button>
          <button onClick={handleStopCashin}>Остановить приём наличных</button>
          <div>Внесено: {cashAmount} рублей</div>
        </div>
      );
    } else {
      return (
        <div className="payment-selection">
          <div className='back' 
          onClick={handleBack}>
            <div className='back_arrow'></div>
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