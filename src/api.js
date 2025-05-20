import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPost = async (newPost) => {
    const res = await axios.post(API_URL, newPost);
    return res.data;
  };