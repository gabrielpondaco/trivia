import { LOGIN } from '../actions';
import { ANSWER } from '../actions/index';


const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
    case ANSWER:
    return {
      ...state,
      assertions: action.payload,
    };
    
  default:
    return state;
  }
};

export default loginReducer;
