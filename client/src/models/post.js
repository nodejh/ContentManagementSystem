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


const detailById = async id => request(`/api/v0.1/post/detail/${id}`);

export {
  insert,
  list,
  detailById,
};
