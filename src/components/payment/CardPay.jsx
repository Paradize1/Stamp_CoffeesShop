import React, { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const CardPayment = ({ price, onBack }) => {
    const [display_cb, setDisplay_cb] = useState("Приложите карту к терминалу");
    const [isCardProcessed, setIsCardProcessed] = useState(false);
    const [cb, setCb] = useState(null);

    function BankCardPurchase(amount, setDisplay_cb) {
        setDisplay_cb('Обработка карты');
        setIsCardProcessed(true); // Разрешаем использовать c+s и c+d
        setTimeout(() => {
            setDisplay_cb('Связь с банком');
        }, 2000);
    }

    useHotkeys('c+p', () => {
        console.log('Карта приложена!');
        BankCardPurchase(price, setDisplay_cb);
    });

    useHotkeys('c+s', () => {
        if (isCardProcessed) {
            console.log('Success!');
            setDisplay_cb('Успешно!');
            setCb(true);
            console.log('Сумма списания: ', price)
            console.log('setCb = true')
            
        }
    }, { enabled: isCardProcessed });

    // Обработчик для "Ошибка"
    useHotkeys('c+d', () => {
        if (isCardProcessed) {
            console.log('Error!');
            setDisplay_cb('Ошибка!');
            setCb(false);
            console.log('Сумма списания: ', price)
            console.log('setCb = false')

        }
    }, { enabled: isCardProcessed });

    useHotkeys('c+f', () => {
        console.log('Принудительное завершение операции');
        setCb(false);
        console.log('Сумма списания: ', price)
        console.log('setCb = false')
    });

    useEffect(() => {
        if (cb === false) {
            window.location.href = '/badpay'; 
        }
        else if (cb === true) {
            window.location.href = '/timer'; 

        }

    }, [cb]);

    const handleStopPay = () => {
        window.location.href = '/main';
    };



    
    return (
        <div className="card-payment">
            <div className="back_to_selection" onClick={onBack}>Назад</div>
            <div className="card_img"></div>
            <div className="card_pay_text">{display_cb}</div>
            <div className="total_to_pay_text">К оплате: {price}₽</div>
            <div className="stop_pay_button" onClick={handleStopPay}>Отмена</div>
        </div>
    );
};

export default CardPayment;
