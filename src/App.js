import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function App() {

  const [selected, setSelected] = useState(null);
  function onChange(event) {
    const { target } = event;
    const { value } = target;

    setSelected(value);
  }

  return (
    <div className="App">
      <Header selected={selected} />
      <Main selected={selected} onChange={onChange} />
      <Footer />
    </div>
  );
}

