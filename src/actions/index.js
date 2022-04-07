export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const SUM_SCORE = 'SUM_SCORE';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const setToken = (token) => ({
  type: TOKEN,
  token,
});

export const sumScore = (payload) => ({
  type: SUM_SCORE,
  payload,
});
