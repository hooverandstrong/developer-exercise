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

  function Customers() {
    return fetch(endpoint + "customers")
      .then(checkError)
      .then(parse);
  }

  function CustomerAddresses(id) {
    return fetch(endpoint + `customer/${id}/addresses`)
      .then(checkError)
      .then(parse);
  }

  function Save(id, address) {
    let method = "POST";
    if (address.Id) {
      method = "PUT";
    }
    return fetch(endpoint + `customer/${id}/address`, { method, body: JSON.serialize(method) })
      .then(checkError)
      .then(parse);
  }

  function Options() {
    return fetch(endpoint + "customers/address/options")
      .then(checkError)
      .then(parse);
  }

  return Object.freeze({ Customers, CustomerAddresses, Save, Options });
}
