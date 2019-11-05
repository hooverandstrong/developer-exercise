import React, { useState, useEffect } from 'react';
import Service from './Service';

import CustomerAddresses from './CustomerAddresses';
import Panel from './Panel';
import Dropdown from './Dropdown';

export default function CustomerList(props) {

  const { selected, onChange } = props;

  const [list, setList] = useState([]);

  useEffect(() => {
    const service = Service();

    service.Customers().then(list => setList(list));
  }, []);

  const options = list.map(customer => {
    return {label: customer.CustomerKey, value: customer.Id};
  });

  let addresses; 
  if (selected && list.length > 0) {
    const customer = list.find(item => item.Id === selected-0);
    addresses = <CustomerAddresses id={selected} name={customer.CustomerKey} />
  };

  return (
    <div className="center">
      <Panel>
        <Dropdown name="Customer" value={selected} prompt="Select a customer..." options={options} onChange={onChange} />
      </Panel>
      {addresses}
    </div>
  );
}
