import { GET_POSTS} from './action';
import { getPosts } from '../services/services';

export const getPostsData = (payload) => {
  return (dispatch) => {
    getPosts(payload).then((response) => {
      dispatch({
        type: GET_POSTS,
        payload: response.data,
      });
    });
  };
};
