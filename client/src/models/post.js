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
 * my post
 */
const myList = async () => request('/api/v0.1/post/myList');


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


export {
  insert,
  list,
  detailById,
  myList,
  join,
};
