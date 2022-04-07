export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const ANSWER = 'ANSWER';
export const SUM_SCORE = 'SUM_SCORE';
export const RESTART_GAME = 'RESTART_GAME';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const setToken = (token) => ({
  type: TOKEN,
  token,
});

export const setAnswers = (payload) => ({
  type: ANSWER,
  payload,
});

export const sumScore = (payload) => ({
  type: SUM_SCORE,
  payload,
});

export const restartGame = () => ({
  type: RESTART_GAME,
});
