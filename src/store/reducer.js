import { GET_POSTS } from './action';
const intialState = {
  posts: [],
};

const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...payload.hits],
      };

    default:
      return state;
  }
};

export default reducer;
