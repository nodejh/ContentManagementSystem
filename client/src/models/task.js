import request from './../utils/request';

/**
 * get task list by id
 * @return {Promise} task list
 */
const list = async id => request(`/api/v0.1/task/list/${id}`);


/**
 * add task
 * @param payload
 * @return {Promise.<Object>}
 */
const add = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/task/add', options);
};


/**
 * all sign list of a task
 * @param id
 */
const signList = async id => request(`/api/v0.1/task/signList/${id}`);


export {
  list,
  add,
  signList,
};
