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

export const fetchToken = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = await response.json();
  dispatch(setToken(data.token));
};
