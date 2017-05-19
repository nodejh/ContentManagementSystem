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


/**
 * sign list of my task
 * @param id
 */
const signListOfMyTask = async id => request(`/api/v0.1/task/signListOfMyTask/${id}`);

/**
 * sign for a task
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


const todayTask = async id => request(`/api/v0.1/task/today/${id}`);


const comment = async (payload) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  };
  return request('/api/v0.1/task/comment', options);
};


const isTodayTaskSigned = async todayTaskId => request(`/api/v0.1/task/isTodayTaskSigned/${todayTaskId}`);


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
  return request('/api/v0.1/task/signDelete', options);
};


export {
  list,
  add,
  signList,
  sign,
  todayTask,
  comment,
  signListOfMyTask,
  isTodayTaskSigned,
  deleteSign,
};
