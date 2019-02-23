import 'whatwg-fetch';

function request(method, url, headers) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers,
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        } else if (response.status === 401) {
          reject(Error('unauthorized'));
        } else {
          reject();
        }
      })
      .catch(() => reject());
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
