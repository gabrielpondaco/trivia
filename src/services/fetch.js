const SEVEN = 7;
export async function fetchToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = await response.json();
  return data.token;
}

export async function fetchQuestions(token, category = '', difficulty = '', type = '') {
  let cat = '';
  if (category !== SEVEN) {
    cat = category;
  }
  const url = `https://opentdb.com/api.php?amount=5&category=${cat}&difficulty=${difficulty}&type=${type}&token=${token}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
