import 'whatwg-fetch';
import { ResourceError, AuthorizationError } from '../errors';

function request(method, url, headers) {
  return fetch(url, {
    method,
    headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        throw new AuthorizationError('service returned 401 - unauthorized');
      }
      if (response.status === 503) {
        throw new ResourceError('service returned 503 - unavailable');
      }
      throw new ResourceError('service returned unknown error');
    });
}

export function authorize(authorizationCode) {
  return request('POST', `${env.SERVICE_URL}/auth/authorize/${authorizationCode}`);
}

export function deauthorize(token) {
  return request('POST', `${env.SERVICE_URL}/auth/deauthorize`, { Authorization: `Bearer ${token}` });
}

export function getActivities(token, before, after) {
  return request('GET', `${env.SERVICE_URL}/api/v1/activities/${before}/${after}`, { Authorization: `Bearer ${token}` });
}
