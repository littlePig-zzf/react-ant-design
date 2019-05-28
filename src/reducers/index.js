import { combineReducers } from 'redux';

const Token = (state = '', action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.token);
      return action.token;
    default:
      return state;
  }
};

const UserName = (state = '', action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      localStorage.setItem('userName', action.userName);
      return action.userName;
    default:
      return state;
  }
};

export default combineReducers({
  Token,
  UserName
});
