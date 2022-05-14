import { fetch } from '../../../utils/http-service.js';

const SERVICE = 'http://localhost:3030/customers';

const customerService = {
  searchCustomer: async (terms) => {
    const filter = Object.keys(terms)
      .map(key => `${key}=${terms[key]}`)
      .join('&');

    const results = await fetch(`${SERVICE}/search?${filter}`);

    return results;
  },

  createCustomer: async (customer) => {
    const dataResponse = await fetch(`${SERVICE}`, {
      method: 'POST',
      body: JSON.stringify(customer)
    });

    return dataResponse;
  },

  updateCustomer: async (customer) => {
    const dataResponse = await fetch(`${SERVICE}/${customer.id}`, {
      method: 'PUT',
      body: JSON.stringify(customer)
    });

    return dataResponse;
  }
};

export function CustomerService() {
  return customerService;
}
