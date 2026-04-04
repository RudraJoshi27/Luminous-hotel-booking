import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchHotelsApi = async (destination, min, max, stars, rating, sort) => {
  let url = '/hotels?';
  if (destination) url += `city=${destination}&`;
  if (min) url += `min=${min}&`;
  if (max) url += `max=${max}&`;
  if (stars && stars.length > 0) url += `stars=${stars.join(',')}&`;
  if (rating) url += `rating=${rating}&`;
  if (sort) url += `sort=${sort}&`;

  const res = await api.get(url);
  return res.data;
};
