import React from 'react';
import CustomerList from './CustomerList';

export default function Header() {

  return (
    <div className="main">
      <aside />
        <CustomerList />
      <aside />
    </div>
  );
}
