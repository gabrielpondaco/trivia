import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../services/fetch';
import { setToken } from '../actions/index';

const FAILED_RESPONSE_CODE = 3;
// let INDEX = 0;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const x = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[x]] = [arr[x], arr[i]];
    }
    return arr;
  }

  async fetchQuestions() {
    const { token, dispatchToken } = this.props;
    const setQuestions = await fetchQuestions(token);
    if (setQuestions.response_code === FAILED_RESPONSE_CODE) {
      const newToken = await fetchToken();
      dispatchToken(newToken);
    }
    this.setState({ questions: setQuestions.results }, () => {
      const { questions } = this.state;
      const answers = [...questions[0].incorrect_answers, questions[0].correct_answer];
      const shuffledAnswers = this.shuffleArray(answers);
      this.setState({ answers: shuffledAnswers });
    });
  }

  render() {
    const { questions, answers } = this.state;
    return (
      <div>
        <h1>Game Page</h1>
        <Header />
        <div>
          {questions.length > 0 ? (
            <div>
              <p data-testid="question-category">{ questions[0].category }</p>
              <p data-testid="question-text">{ questions[0].question }</p>
              <div data-testid="answer-options">
                {answers.map((answer, index) => (
                  <button
                    type="button"
                    key={ index }
                    data-testid={ (questions[0].correct_answer === answer)
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          ) : ''}
          {/* <button data-testid="btn-next" onClick={ index += 1 }>
            Next
          </button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: (token) => dispatch(setToken(token)),
});

Game.propTypes = {
  token: propTypes.string.isRequired,
  dispatchToken: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
