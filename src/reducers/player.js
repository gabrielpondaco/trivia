import { LOGIN, ANSWER, SUM_SCORE, RESTART_GAME, SET_SETTINGS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  settings: {},
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESTART_GAME:
    return INITIAL_STATE;
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
  case SUM_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case SET_SETTINGS:
    return {
      ...state,
      settings: action.payload,
    };
  default:
    return state;
  }
};

export default loginReducer;
