import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const instance = axios.create(defaultOptions);
  return instance;
};

export default fetchClient();