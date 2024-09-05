import React from 'react';
import {Routes, Route } from'react-router-dom';

import PromoMain from "./start_pages/PromoMain";
import Main from './Main/Main';
import Pay
 from './payment/Pay';
function App() {
  return (
      <Routes>
        <Route path="/" element={<PromoMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/pay" element={<Pay />} />

      </Routes>
  );
}

export default App;