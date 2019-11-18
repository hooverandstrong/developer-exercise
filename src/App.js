import React, { useState, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import Service from './Service';
import makeAddressReducer from './makeAddressReducer';

export default function App() {

  const [selected, setSelected] = useState(null);
  const service = Service();
  const [customerAddresses, dispatch] = useReducer(makeAddressReducer(service, setSelected), []);

  return (
    <div className="App">
      <Header selected={selected} setSelected={setSelected} dispatch={dispatch} />
      <Main selected={selected} setSelected={setSelected} customerAddresses={customerAddresses} dispatch={dispatch} />
      <Footer />
    </div>
  );
}

