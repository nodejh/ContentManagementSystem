import { prefix } from './../config';
import request from './../utils/request';

const getTasks = async (postId) => {
  return request(`${prefix}/tasks/${postId}`);
};


const deleteTask = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  };
  return request(`${prefix}/task/delete`, options);
};


export {
  getTasks,
  deleteTask,
};