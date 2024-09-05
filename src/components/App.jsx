import React from 'react';
import {Routes, Route } from'react-router-dom';

import PromoMain from "./start_pages/PromoMain";
import Main from './Main/Main';

function App() {
  return (
      <Routes>
        <Route path="/" element={<PromoMain />} />
        <Route path="/main" element={<Main />} />
      </Routes>
  );
}

export default App;