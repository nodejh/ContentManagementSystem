import request from './../utils/request';

/**
 * get task list by id
 * @return {Promise} task list
 */
const list = async id => request(`/api/v0.1/task/list/${id}`);


/**
 * sign for task
 * @param payload
 * @return {Promise.<Object>}
 */
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
  return request('/api/v0.1/task/sign', options);
};


const signList = async id => request(`/api/v0.1/task/signList/${id}`);


export {
  list,
  sign,
  signList,
};
