import request from './../utils/request';


const insert = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/post/insert', options);
};


const list = async () => request('/api/v0.1/post/list');


/**
 * my post list
 */
const myList = async () => request('/api/v0.1/post/myList');


/**
 * my join list
 */
const myJoin = async () => request('/api/v0.1/post/myJoin');


const detailById = async id => request(`/api/v0.1/post/detail/${id}`);

/**
 * join post
 * @param id
 * @return {Promise.<Object>}
 */
const join = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  };
  return request('/api/v0.1/post/join', options);
};


const isJoin = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  };
  return request('/api/v0.1/post/isJoin', options);
};


const sign = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/post/sign', options);
};


const users = async id => request(`/api/v0.1/post/users/${id}`);


export {
  insert,
  list,
  detailById,
  myList,
  join,
  isJoin,
  sign,
  users,
  myJoin,
};
