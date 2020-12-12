import React from 'react';
import CustomerList from './CustomerList';

export default function Main(props) {
  const { selected, setSelected, customerAddresses, dispatch } = props

  return (
    <div className="main">
      <aside />
        <CustomerList selected={selected} setSelected={setSelected} customerAddresses={customerAddresses} dispatch={dispatch} />
      <aside />
    </div>
  );
}
