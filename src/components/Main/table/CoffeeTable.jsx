import React, { useState, useEffect } from 'react';

import './CoffeeTable.css';

const CoffeeTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState({ 
    name: '', 
    image: '', 
    prices: { small: 0, medium: 0, large: 0 } });

  const [isClosing, setIsClosing] = useState(false);
  const [selectedSize, setSelectedSize] = useState('small');
  const [isSyrupModalOpen, setSyrupModalOpen] = useState(false); // Для второго модального окна
  const [syrups, setSyrups] = useState({
    vanilla: 0,
    mint: 0,
    caramel: 0,
    chocolate: 0
  });

  const [finalPrice, setFinalPrice] = useState(0);

  const openModal = (name, image, prices) => {
    setModalContent({ name, image, prices});
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsClosing(false);
      setModalContent({ name: '', image: '', prices: { small: 0, medium: 0, large: 0 } });
    }, 600); // Длительность анимации
  };

  const getPrice = () => {
    switch (selectedSize) {
      case 'small':
        return modalContent.prices.small;
      case 'medium':
        return modalContent.prices.medium;
      case 'large':
        return modalContent.prices.large;
      default:
        return modalContent.prices.small;
    }
  };

  const openSyrupModal = () => {
    setSyrupModalOpen(true);
  };

  const closeSyrupModal = () => {
    setSyrupModalOpen(false);
  };

  
  // Функции для изменения грамм сиропов
  const handleSyrupChange = (type, change) => {
    setSyrups(prevSyrups => {
      const newAmount = Math.max(prevSyrups[type] + change, 0);
      return {
        ...prevSyrups,
        [type]: newAmount
      };
    });
  };
  
  const getSyrupPrice = () => {
  const syrupPrice = 20;
  const totalSyrups = Object.values(syrups).reduce((acc, amount) => acc + amount, 0);
  return syrupPrice * totalSyrups;
  };

  useEffect(() => {
    const basePrice = getPrice();
    const syrupPrice = getSyrupPrice();
    setFinalPrice(basePrice + syrupPrice);
  }, [selectedSize, syrups]);

  const handlePayClick = () => {
    const price = isSyrupModalOpen? finalPrice : getPrice();
    localStorage.setItem('price', price);
    window.location.href = '/pay';
  };

  return (
    <div className="coffee-table">

      <div className="coffee-item" 
      onClick={() => openModal('Эспрессо', 'espresso-image', { small: 79, medium: 99, large: 119 })}>
        <div className="coffee-image espresso-image"></div>
        <div className="coffee-text">Эспрессо</div>
        <div className="coffee-price">от 79₽</div>
      </div>

      <div className="coffee-item" 
      onClick={() => openModal('Эспрессо', 'espresso-image', { small: 79, medium: 99, large: 119 })}>
        <div className="coffee-image espresso-image"></div>
        <div className="coffee-text">Эспрессо</div>
        <div className="coffee-price">от 79₽</div>
      </div>

      <div className="coffee-item" 
      onClick={() => openModal('Американо', 'americano-image', { small: 119, medium: 139, large: 159 })}>
        <div className="coffee-image americano-image"></div>
        <div className="coffee-text">Американо</div>
        <div className="coffee-price">от 119₽</div>
      </div>

      <div className="coffee-item" 
      onClick={() => openModal('Латте', 'latte-image', { small: 129, medium: 149, large: 169 })}>
        <div className="coffee-image latte-image"></div>
        <div className="coffee-text">Латте</div>
        <div className="coffee-price">от 129₽</div>
      </div>

      <div className="coffee-item" 
      onClick={() => openModal('Капучино', 'cappuccino-image', { small: 129, medium: 149, large: 169 })}>
        <div className="coffee-image cappuccino-image"></div>
        <div className="coffee-text">Капучино</div>
        <div className="coffee-price">от 129₽</div>
      </div>

      <div className="coffee-item" 
      onClick={() => openModal('Макиато', 'macchiato-image', { small: 129, medium: 149, large: 169 })}>
        <div className="coffee-image macchiato-image"></div>
        <div className="coffee-text">Макиато</div>
        <div className="coffee-price">от 129₽</div>
      </div>

      {/* Модальное окно напитка */}
      {(isModalOpen || isClosing) && (
      <div className={`modal-background ${isClosing ? 'closing' : ''}`}>

        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close" onClick={closeModal}>
              <div className='x'></div>
            </div>

            {/* Картинка и название напитка */}
            <div className={`modal-drink-img ${modalContent.image}`}></div>
            <div className="modal-drink-name">{modalContent.name}</div>

            {/* Размеры напитка */}
            <div className="modal-drink-size">
              <div className={`size_1 ${selectedSize === 'small' ? 'active' : ''}`} onClick={() => setSelectedSize('small')}>
                <div className="size_1_img"></div>
                <div className="size1">200мл.</div>
              </div>
              <div className={`size_2 ${selectedSize === 'medium' ? 'active' : ''}`} onClick={() => setSelectedSize('medium')}>
                <div className="size_2_img"></div>
                <div className="size2">300мл.</div>
              </div>
              <div className={`size_3 ${selectedSize === 'large' ? 'active' : ''}`} onClick={() => setSelectedSize('large')}>
                <div className="size_3_img"></div>
                <div className="size3">400мл.</div>
              </div>
            </div>

            <div className="sirop" onClick={openSyrupModal}>Хотите добавить сироп?</div>

            <div className="pay_button" onClick={handlePayClick}>
              <div className="pay_text">Оплатить</div>
              <div className="pay_price">{getPrice()}₽</div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Модальное окно для сиропов */}
      {(isSyrupModalOpen || isClosing) && (
      <div className={`modal-background ${isClosing ? 'closing' : ''}`}>

        <div className="syrop-modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close" onClick={closeSyrupModal}>
              <div className="x"></div>
            </div>


            <div className="syrup-selection">
              {/* Ванильный сироп */}
              <div className="syrup-item">
                <div className="syrup-name">Ванильный</div>
                <div className="syrup-controls">
                  <div className='syrop-minus' onClick={() => handleSyrupChange('vanilla', -1)}>-</div>
                  <span>{syrups.vanilla} гр.</span>
                  <div className='syrop-plus' onClick={() => handleSyrupChange('vanilla', 1)}>+</div>
                </div>
              </div>

              {/* Мятный сироп */}
              <div className="syrup-item">
                <div className="syrup-name">Мятный</div>
                <div className="syrup-controls">
                  <div className='syrop-minus' onClick={() => handleSyrupChange('mint', -1)}>-</div>
                  <span>{syrups.mint} гр.</span>
                  <div className='syrop-plus' onClick={() => handleSyrupChange('mint', 1)}>+</div>
                </div>
              </div>

              {/* Карамельный сироп */}
              <div className="syrup-item">
                <div className="syrup-name">Карамельный</div>
                <div className="syrup-controls">
                  <div className='syrop-minus' onClick={() => handleSyrupChange('caramel', -1)}>-</div>
                  <span>{syrups.caramel} гр.</span>
                  <div className='syrop-plus' onClick={() => handleSyrupChange('caramel', 1)}>+</div>
                </div>
              </div>

              {/* Шоколадный сироп */}
              <div className="syrup-item">
                <div className="syrup-name">Шоколадный</div>
                <div className="syrup-controls">
                  <div className='syrop-minus' onClick={() => handleSyrupChange('chocolate', -1)}>-</div>
                  <span>{syrups.chocolate} гр.</span>
                  <div className='syrop-plus' onClick={() => handleSyrupChange('chocolate', 1)}>+</div>
                </div>
              </div>
            </div>

            

          </div>

          <div className="pay_syrop_button"onClick={handlePayClick}>
              <div className="pay_syrop_text">Оплатить</div>
              <div className="pay_syrop_price">{finalPrice}₽</div>
            </div>
        </div>
        </div>
      )}



    </div>
  );
};

export default CoffeeTable;