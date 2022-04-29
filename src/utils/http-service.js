const fetchClient = window.fetch;

/**
 * Wraps the native fetch function with the custom logic for managing the API.
 * 
 * @param {String} url The url to hit.
 * @param {Object} params The parameters (not required) for the request).
 * 
 * @returns The actual data from the generic response (based on the API specification).
 */
export const fetch = async (url, params) => {
  const httpResponse = await fetchClient(url, params);
  const dataResponse = await httpResponse.json();

  if (httpResponse.status >= 300 || dataResponse.error === true) {
    throw new Error(dataResponse.errorMessage || 'Unexpected error');
  }

  return dataResponse.data;
};