import React, { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const CashPayment = ({ price, onBack }) => {
  const [cash, setCash] = useState(0);
  const [displayCb, setDisplayCb] = useState('Вставьте купюры в купюроприемник');
  const [isCashProcessed, setIsCashProcessed] = useState(false);
  const [cb, setCb] = useState(null);

  function StartCashin() {
    setDisplayCb('Банкомат запущен');
    setIsCashProcessed(true);
    setTimeout(() => {
      setDisplayCb('Внесите наличные');
    }, 2000);
  }

  function handleCashAddition(amount) {
    if (isCashProcessed) {
      setCash(prevCash => prevCash + amount);
      console.log(`Внесено: ${amount}₽`);
    }
  }

  useHotkeys('c+p', () => {
    StartCashin();
  });

  useHotkeys('m+1', () => handleCashAddition(10));
  useHotkeys('m+2', () => handleCashAddition(20));
  useHotkeys('m+3', () => handleCashAddition(30));
  useHotkeys('m+4', () => handleCashAddition(40));
  useHotkeys('m+5', () => handleCashAddition(50));
  useHotkeys('m+6', () => handleCashAddition(60));
  useHotkeys('m+7', () => handleCashAddition(70));
  useHotkeys('m+8', () => handleCashAddition(80));
  useHotkeys('m+9', () => handleCashAddition(90));
  useHotkeys('m+10', () => handleCashAddition(100));

  useHotkeys('c+s', () => {
    if (isCashProcessed) {
      if (cash >= price) {
        console.log('Success!');
        const change = cash - price;
        setDisplayCb(`Успешно, ваша сдача: ${change}₽`);
        setCb(true);
        console.log('Сумма внесённых наличных: ', cash);
        console.log('setCb = true');

        setTimeout(() => {
          window.location.href = '/timer';
        }, 5000);

      } else {
        setDisplayCb('Недостаточно средств!');
        console.log('Недостаточно средств!');
      }
    }
  }, { enabled: isCashProcessed });

  useHotkeys('c+d', () => {
    if (isCashProcessed) {
      console.log('Error!');
      setDisplayCb('Ошибка!');
      setCb(false);
      console.log('Сумма внесённых наличных: ', cash);
      console.log('setCb = false');
    }
  }, { enabled: isCashProcessed });

  useHotkeys('c+f', () => {
    console.log('Принудительное завершение операции');
    setCb(false);
    console.log('Сумма внесённых наличных: ', cash);
    console.log('setCb = false');
  });

  useEffect(() => {
    if (cb === false) {
      window.location.href = '/badpay'; 
    } 
  }, [cb]);

  const handleStopPay = () => {
    window.location.href = '/main';
  };

  return (
    <div className="cash-payment">
      <div className="back_to_selection" onClick={onBack}>Назад</div>
      <div className='cash_img'></div>
      <div className="total_to_pay_text">К оплате: {price}₽</div>
      <div className="cash_pay_text">{displayCb}</div>
      <div className='cash_amount'>Внесённые средства: {cash}₽</div>
      <div className="stop_pay_button" onClick={handleStopPay}>Отмена</div>
    </div>
  );
};

export default CashPayment;
