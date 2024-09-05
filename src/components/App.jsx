import React from 'react';
import {Routes, Route } from'react-router-dom';

import PromoMain from "./start_pages/PromoMain";
import Main from './Main/Main';
import Pay from './payment/Pay';
import BadPay from './payment/BadPay';
import Timer from './payment/Timer';
import Ready from './payment/Ready';

function App() {
  return (
      <Routes>
        <Route path="/" element={<PromoMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/badpay" element={<BadPay />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/ready" element={<Ready />} />


      </Routes>
  );
}

export default App;