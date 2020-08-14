import { GET_NOTES } from '../actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.payload; //returns to inde.js of reducer to store in root reducer
    default:
      return state;
  }
}
