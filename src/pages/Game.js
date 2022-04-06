import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../services/fetch';
import { setToken } from '../actions/index';
import Timer from '../components/Timer';
import '../App.css';

const FAILED_RESPONSE_CODE = 3;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
      answered: false,
      questionNumber: 0,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClickAnswered = this.handleClickAnswered.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
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

  createAnswers() {
    const { questions, questionNumber } = this.state;
    const answers = [...questions[questionNumber].incorrect_answers,
      questions[questionNumber].correct_answer];
    const shuffledAnswers = this.shuffleArray(answers);
    this.setState({ answers: shuffledAnswers });
  }

  async fetchQuestions() {
    const { token, dispatchToken } = this.props;
    const setQuestions = await fetchQuestions(token);
    if (setQuestions.response_code === FAILED_RESPONSE_CODE) {
      const newToken = await fetchToken();
      dispatchToken(newToken);
    }
    this.setState({ questions: setQuestions.results });
    this.createAnswers();
  }

  handleColor(answer) {
    const { questions, questionNumber } = this.state;
    if (questions[questionNumber].correct_answer === answer) {
      return 'green-border';
    }
    return 'red-border';
  }

  handleClickAnswered() {
    this.setState({
      answered: true,
    });
  }

  handleClickNext() {
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      answered: false,
    }), () => this.createAnswers());
  }

  render() {
    const { questions, answers, answered, questionNumber } = this.state;
    return (
      <div>
        <h1>Game Page</h1>
        <Header />
        <Timer />
        <div>
          {questions.length > 0 ? (
            <div>
              <p
                data-testid="question-category"
              >
                { questions[questionNumber].category }
              </p>
              <p data-testid="question-text">{ questions[questionNumber].question }</p>
              <div data-testid="answer-options">
                {answers.map((answer, index) => (
                  <button
                    className={ answered ? this.handleColor(answer) : '' }
                    onClick={ this.handleClickAnswered }
                    type="button"
                    key={ index }
                    data-testid={ (questions[questionNumber].correct_answer === answer)
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          ) : ''}
        </div>
        {answered
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleClickNext }
            >
              Next
            </button>) : ''}
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
