import Axios from 'axios';

export const getPosts = (payload) => {
  return Axios.get(
    `${process.env.REACT_APP_POSTS_API}?tags=story&page=${payload}`
  );
};
