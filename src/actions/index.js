export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const setToken = (token) => ({
  type: TOKEN,
  token,
});
