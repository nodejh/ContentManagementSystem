import { prefix } from './../config';
import request from './../utils/request';

const getPosts = async () => {
  return request(`${prefix}/posts`);
};


const deletePost = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
    credentials: 'include',
  };
  return request(`${prefix}/post/delete/`, options);
};

export {
  getPosts,
  deletePost,
};