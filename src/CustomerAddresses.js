import React, { useState, useEffect } from 'react';
import { LOAD, CHANGE } from './actions';
import Panel from './Panel';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import Loading from './Loading';
import DataGrid from './DataGrid';

import Service from './Service';

export default function CustomerList(props) {

  const { id, name, customerAddresses, dispatch } = props;

  const [options, setOptions] = useState({});

  useEffect(() => {
    const service = Service();
    service.Options().then(options => setOptions(options));
  }, []);

  useEffect(() => {
    const service = Service();
    service.CustomerAddresses(id).then(customerAddresses => dispatch({type: LOAD, payload: customerAddresses}));
  }, [id, dispatch]);

  function getIndex(list, id, index) {
    console.log(list, id, index, id ? list.findIndex((item) => item.Id === id) : index);
    return id ? list.findIndex((item) => item.Id === id) : index;
  }

  function makeChangeHandler(key) {
    return (event) => {
      const { target } = event;
      const { value, name } = target;
      const idx = customerAddresses.findIndex((item) => item.key === key);
      if (idx !== -1) {
        const item = customerAddresses[idx];
        dispatch({
          type: CHANGE,
          payload: [
            ...customerAddresses.slice(0, idx),
            {...item, [name]: value},
            ...customerAddresses.slice(idx + 1)
          ]
        });
      }
    };
  }

  function makeAddressChangeHandler(key) {
    return (event) => {
      const { target } = event;
      const { value, name } = target;
      const idx = customerAddresses.findIndex((item) => item.key === key);
      if (idx !== -1) {
        const item = customerAddresses[idx];
        const { Address } = item;

        dispatch({
          type: CHANGE,
          payload: [
            ...customerAddresses.slice(0, idx),
            {
              ...item,
              Address: {
                ...Address,
                [name]: value
              }
            },
            ...customerAddresses.slice(idx + 1)
          ]
        });
      }
    };
  }

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
    const onChange = makeChangeHandler(item.key);
    const onChangeAddress = makeAddressChangeHandler(item.key);
    const { Address } = item;
    const types = Object.keys(options.Types).map(value => ({label: options.Types[value], value}));
    let region = <Dropdown name="Region" value={Address.Region} options={options.USStates} onChange={onChangeAddress} />;
    if (Address.Country !== "US") {
      region = <TextInput name="Region" value={Address.Region} onChange={onChangeAddress} />
    }

    const { key } = item;
    return (
      <tr key={key}>
        <td><Dropdown name="Type" value={item.Type} options={types} onChange={onChange} /></td>
        <td><TextInput name="Name" value={Address.Name} onChange={onChangeAddress} /></td>
        <td><TextInput name="Street1" value={Address.Street1} onChange={onChangeAddress} /></td>
        <td><TextInput name="Street2" value={Address.Street2} onChange={onChangeAddress} size="3"/></td>
        <td><TextInput name="City" value={Address.City} onChange={onChangeAddress} /></td>
        <td>{region}</td>
        <td><TextInput name="PostalCode" value={Address.PostalCode} onChange={onChangeAddress} size="6" /></td>
        <td><Dropdown name="Country" value={Address.Country} options={options.Countries} onChange={onChangeAddress} /></td>
        <td><button>Disable</button></td>
      </tr>
    );
  }

  console.log(customerAddresses);
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

  return (
    <>
      <Panel grow list>
        <header>
          <h1>Manage addresses for {name}</h1>
        </header>
        {dataGrid}
      </Panel>
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
    </>
  );
}
