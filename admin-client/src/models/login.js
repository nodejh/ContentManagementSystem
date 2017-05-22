import { prefix } from './../config';
import request from './../utils/request';


const login = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request(`${prefix}/login`, options);
};


export {
  login,
};