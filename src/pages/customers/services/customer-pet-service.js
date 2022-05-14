import { fetch } from '../../../utils/http-service.js';

const SERVICE = 'http://localhost:3030/customers';

export function CustomerPetService() {
  return {
    getPetsForUser: () => {
      const url = `${SERVICE}/pets`;
      return fetch(url);
    }
  };
}
