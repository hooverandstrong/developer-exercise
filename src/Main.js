import React from 'react';
import CustomerList from './CustomerList';

export default function Main(props) {
  const { selected, onChange } = props

  return (
    <div className="main">
      <aside />
        <CustomerList selected={selected} onChange={onChange} />
      <aside />
    </div>
  );
}
