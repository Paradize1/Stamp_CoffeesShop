import React, { useState, useEffect } from'react';
import CoffeeTable from './table/CoffeeTable.jsx';
import "./Main.css"


const Main = () => {
  const [selectedItem, setSelectedItem] = useState('coffee');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const getHeaderColor = () => {
    switch (selectedItem) {
      case 'coffee':
        return '#EFCCB9';
      case 'tea':
        return '#DEF8B7';
      case 'milkshake':
        return '#F9ECD2';
      default:
        return '#FFE665';
    }
  };

  const getEclipsePosition = () => {
    switch (selectedItem) {
      case 'coffee':
        return { left: '50px' };
      case 'tea':
        return { left: '310px' };
      case 'milkshake':
        return { left: '565px' };
      case 'alternative':
        return { left: '845px' };
      default:
        return { left: '50px' };
    }
  };


  return (
    <div className="Main">
      <div className="Header" style={{ backgroundColor: getHeaderColor() }}>
        <div className='Vector'></div>
        <div className='Select_text'>Выбор напитка</div>
        <div className='SignUp'>
          <div className='Icon'></div>
          <div className='Sign'>Вход / регистрация</div>
        </div>
      </div>

      <div className='Block2'>
        <div className='Select_item'>
          <div className='Coffee' onClick={() => handleItemClick('coffee')}>
            <div className='Eclipse1' style={{ ...getEclipsePosition(), backgroundColor: getHeaderColor() }}></div>
            <div className='Coffee-image'></div>
            <div className='Coffee-text'>Кофе</div>
          </div>
          <div className='Tea' onClick={() => handleItemClick('tea')}>
            <div className='Eclipse1' style={{ ...getEclipsePosition(), backgroundColor: getHeaderColor() }}></div>
            <div className='Tea-image'></div>
            <div className='Tea-text'>Чай</div>
          </div>
          <div className='Milkshake' onClick={() => handleItemClick('milkshake')}>
            <div className='Eclipse1' style={{ ...getEclipsePosition(), backgroundColor: getHeaderColor()}}></div>
            <div className='Milkshake-image'></div>
            <div className='Milkshake-text'>Молочный коктейль</div>
          </div>
          <div className='Alternative' onClick={() => handleItemClick('alternative')}>
            <div className='Eclipse1' style={{ ...getEclipsePosition(), backgroundColor: getHeaderColor() }}></div>
            <div className='Alternative-image'></div>
            <div className='Alternative-text'>Морсы и газ. напитки</div>
          </div>
        </div>
      </div>

      <div className='Body'>
        <div className='Selected_Item'>
        {selectedItem === 'coffee' && 'Кофе'}
        {selectedItem === 'tea' && 'Чай'}
        {selectedItem === 'milkshake' && 'Молочный коктейль'}
        {selectedItem === 'alternative' && 'Морсы и газ. напитки'}
        </div>     
      <div className='Eclipse2' style={{backgroundColor: getHeaderColor() }}></div>
      <div className='Double'></div>

      <div className='MainTable'>
          <CoffeeTable />
          </div>
      </div>


      
    </div>
  )
  };
  
  export default Main;