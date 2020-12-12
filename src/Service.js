import { endpoint } from './consts';

export default function Service() {

  function checkError(response) {
    if (response.status !== 200) {
      throw Error(response.statusText);
    } 
    return response;
  }

  function parse(response) {
    return response.json();
  }

  function setKeys(list) {
    return list.map(item => ({...item, key: item.Id}));
  }

  function Customers() {
    return fetch(endpoint + "customers")
      .then(checkError)
      .then(parse);
  }

  function CustomerAddresses(id) {
    return fetch(endpoint + `customer/${id}/addresses`)
      .then(checkError)
      .then(parse)
      .then(setKeys);
  }

  function Save(id, address) {
    let method = "POST";
    if (address.Id) {
      method = "PUT";
    }
    address.key = undefined;
    return fetch(endpoint + `customer/${id}/address`, { method, body: JSON.stringify(address) })
      .then(checkError)
      .then(parse);
  }

  function Options() {
    return fetch(endpoint + "customers/address/options")
      .then(checkError)
      .then(parse);
  }

  function Create(key) {
    return {
      key,
      Type: "ALT",
      Address: {
        Name: "",
        Street1: "",
        Street2: "",
        City: "",
        State: "",
        PostalCode: "",
        Country: "US"
      }
    };
  }

  return Object.freeze({ Customers, CustomerAddresses, Save, Options, Create });
}
