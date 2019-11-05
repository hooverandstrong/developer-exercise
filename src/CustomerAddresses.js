import React, { useState, useReducer, useEffect } from 'react';
import { LOAD } from './consts';
import Panel from './Panel';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import Loading from './Loading';
import DataGrid from './DataGrid';

import Service from './Service';

export default function CustomerList(props) {

  const { id, name } = props;

  const [options, setOptions] = useState({});
  const [customerAddresses, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case LOAD: 
        return action.payload;

      default: 
        return state;
    }
  }, []);

  useEffect(() => {
    const service = Service();
    service.Options().then(options => setOptions(options));
  }, []);

  useEffect(() => {
    const service = Service();
    service.CustomerAddresses(id).then(customerAddresses => dispatch({type: LOAD, payload: customerAddresses}));
  }, [id]);

  function renderHeader() {
    return (
      <tr>
        <th>Type</th>
        <th>Name</th>
        <th>Street1</th>
        <th>Street2</th>
        <th>City</th>
        <th>Region</th>
        <th>Postal Code</th>
        <th>Country</th>
        <th>Actions</th>
      </tr>
    );
  }



  function renderLine(item) {
    console.log(item);
    const onChange = () => {};
    const onChangeAddress = () => {};
    const { Address } = item;
    const types = Object.keys(options.Types).map(value => ({label: options.Types[value], value}));
    let region = <Dropdown name="Region" value={Address.Region} options={options.USStates} onChange={onChangeAddress} />;
    if (Address.Country !== "US") {
      region = <TextInput name="Region" value={Address.Region} onChange={onChangeAddress} />
    }
    return (
      <tr key={item.Id}>
        <td><Dropdown name="Type" value={item.Type} options={types} onChange={onChange} /></td>
        <td><TextInput name="Name" value={Address.Name} onChange={onChangeAddress} /></td>
        <td><TextInput name="Street1" value={Address.Street1} onChange={onChangeAddress} /></td>
        <td><TextInput name="Street2" value={Address.Street2} onChange={onChangeAddress} size="3"/></td>
        <td><TextInput name="City" value={Address.City} onChange={onChangeAddress} /></td>
        <td>{region}</td>
        <td><TextInput name="PostalCode" value={Address.PostalCode} onChange={onChangeAddress} size="6" /></td>
        <td><Dropdown name="Country" value={Address.Country} options={options.Countries} onChange={onChange} /></td>
        <td><button>Disable</button></td>
      </tr>
    );
  }

  function active(item) {
    return item.ActiveTo === undefined || new Date(item.ActiveTo) >= new Date();
  }
  const activeAddresses = customerAddresses.filter(active);
  const previousAddresses = customerAddresses.filter(item => !active(item));
  const previousAddressRows = previousAddresses.map(previous => {
    return (
      <tr key={previous.Id}>
        <td>{previous.Type}</td>
        <td>{previous.Address.Name}</td>
        <td>{previous.Address.Street1}</td>
        <td>{previous.Address.Street2}</td>
        <td>{previous.Address.City}</td>
        <td>{previous.Address.Region}</td>
        <td>{previous.Address.PostalCode}</td>
        <td>{previous.Address.Country}</td>
        <td>{previous.ActiveFrom} - {previous.ActiveTo}</td>
        <td><button>Restore</button></td>
      </tr>
    );
  });

  let dataGrid = <Loading />;
  if (customerAddresses.length > 0 && Object.keys(options).length > 0) {
    dataGrid = <DataGrid renderLine={renderLine} renderHeader={renderHeader} data={activeAddresses} />
  }

  return [
    <Panel grow list>
      <header>
        <h1>Manage addresses for {name}</h1>
      </header>
      {dataGrid}
    </Panel>,
    <Panel list>
      <header>
        <h2>Previously used addresses for {name}</h2>
      </header>
      <table className="grid">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Street1</th>
            <th>Street2</th>
            <th>City</th>
            <th>Region</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{previousAddressRows}</tbody>
      </table>
    </Panel>
  ];
}
