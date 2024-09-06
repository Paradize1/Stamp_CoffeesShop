import React, { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import './Pay.css';

const Timer = () => {
    const [time, setTime] = useState(60);
    const [finalOrder, setFinalOrder] = useState(null);

    useEffect(() => {
        // Получаем данные о заказе из localStorage
        const storedOrder = localStorage.getItem('finalOrder');
        if (storedOrder) {
            setFinalOrder(JSON.parse(storedOrder));
        }

        if (time <= 0) {
            window.location.href = '/ready'; 
            return;
        }
        const interval = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    useHotkeys('c+r', () => {
        console.log('Нетерпеливый!');
        window.location.href = '/ready';
    });

    const renderSyrups = () => {
        if (finalOrder && finalOrder.syrups) {
            const syrups = finalOrder.syrups;
            return syrups.length > 0 ? syrups : 'Без сиропов';
        }
        return 'Без сиропов';
    };

    return (
        <div className="Timer">
            <div className="OrderDetails">
                <div className="OrderNumber">Заказ номер {finalOrder?.orderNumber || 'N/A'}</div>
                <div className="DrinkName">{finalOrder?.coffee || 'Название напитка'}</div>
                <div className="Syrups">{renderSyrups()}</div>
            </div>
            <div className="Animated_time">
                <svg viewBox="0 0 100 100">
                    <circle className="background-circle" cx="50" cy="50" r="45" />
                    <circle className="progress-circle" cx="50" cy="50" r="45" />
                </svg>
            </div>
            <div className="Counting_down">{time < 10 ? `0:0${time}` : `0:${time}`}</div>
            <div className="Timer_text">Приготовление напитка</div>
        </div>
    );
};

export default Timer;