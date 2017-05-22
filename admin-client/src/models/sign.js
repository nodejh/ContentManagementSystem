import { prefix } from './../config';
import request from './../utils/request';

const getSign = async (taskId) => {
  return request(`${prefix}/sign/${taskId}`);
};


const deleteSign = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  };
  return request(`${prefix}/sign/delete`, options);
};


export {
  getSign,
  deleteSign,
};