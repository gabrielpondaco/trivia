import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../services/fetch';
import { setToken, sumScore, setAnswers } from '../actions/index';
import Timer from '../components/Timer';
import '../css/game.css';
import logo from '../trivia.png';

const he = require('he');

const FAILED_RESPONSE_CODE = 3;
const TOTAL_QUESTIONS = 4;
class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
      answered: false,
      questionNumber: 0,
      rightAnswers: 0,
      point: 0,
      timeLeft: 30,
      resetClock: true,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClickAnswered = this.handleClickAnswered.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.handleClickAnswered = this.handleClickAnswered.bind(this);
    this.calculatePoint = this.calculatePoint.bind(this);
    this.handleTime = this.handleTime.bind(this);
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
    const { token, dispatchToken, settings: { category, difficulty, type } } = this.props;
    const setQuestions = await fetchQuestions(token, category, difficulty, type);
    if (setQuestions.response_code === FAILED_RESPONSE_CODE) {
      const newToken = await fetchToken();
      dispatchToken(newToken);
    }
    this.setState({ questions: setQuestions.results });
    this.createAnswers();
  }

  calculatePoint() {
    const { questions, questionNumber } = this.state;
    const base = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const timer = Number(document.getElementById('timer').innerHTML);
    switch (questions[questionNumber].difficulty) {
    case 'hard':
      return base + (timer * hard);
    case 'medium':
      return base + (timer * medium);
    case 'easy':
      return base + (timer * easy);
    default:
      return 0;
    }
  }

  handleColor(answer) {
    const { questions, questionNumber } = this.state;
    const correct = questions[questionNumber].correct_answer === answer;
    if (correct) {
      return 'green-border';
    }

    return 'red-border';
  }

  handleClickAnswered({ target }) {
    const { dispatchScore, sendAnswers } = this.props;
    this.setState({
      answered: true,
      resetClock: false,
    });
    if (target.dataset.testid === 'correct-answer') {
      this.setState((prevState) => ({
        point: prevState.point + this.calculatePoint(),
        rightAnswers: prevState.rightAnswers + 1,
      }), () => {
        const { point, rightAnswers } = this.state;
        dispatchScore(point);
        sendAnswers(rightAnswers);
      });
    }
  }

  handleClickNext() {
    const { questionNumber, timeLeft } = this.state;
    if (questionNumber === TOTAL_QUESTIONS || timeLeft === 0) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      answered: false,
      resetClock: true,
    }), () => this.createAnswers());
  }

  handleTime(time) {
    this.setState({
      timeLeft: time,
    });
  }

  render() {
    const { questions, answers, answered, questionNumber, timeLeft,
      resetClock } = this.state;
    return (
      <body className="body-game">
        <div className="header-timer">
          <img src={ logo } className="App-logo-game" alt="logo" />
          <Header />
          {resetClock ? (
            <Timer onChange={ this.handleTime } resetClock={ resetClock } />) : ''}
        </div>
        <div className="container-game">
          {questions.length > 0 ? (
            <section className="section-category-question">
              <span className="span-category">
                <h1
                  data-testid="question-category"
                >
                  <div className="categoryLabel">
                    <span id="categoryText">Category: </span>
                    { questions[questionNumber].category }
                  </div>
                </h1>
              </span>
              <span className="span-question">
                <h3 data-testid="question-text" className="">
                  { he.decode(questions[questionNumber].question) }
                </h3>
              </span>
              <div data-testid="answer-options" className="container-btn-question">
                {answers.map((answer, index) => (
                  <button
                    className={ answered ? this.handleColor(answer) : '' }
                    onClick={ this.handleClickAnswered }
                    type="button"
                    key={ index }
                    data-testid={ (questions[questionNumber].correct_answer === answer)
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    { he.decode(answer)}
                  </button>
                ))}
              </div>
            </section>
          ) : ''}
          {answered || timeLeft === 0
            ? (
              <button
                id="btn-next"
                type="button"
                data-testid="btn-next"
                onClick={ this.handleClickNext }
              >
                Next
              </button>) : ''}
        </div>
      </body>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  settings: state.player.settings,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: (token) => dispatch(setToken(token)),
  sendAnswers: (payload) => dispatch(setAnswers(payload)),
  dispatchScore: (payload) => dispatch(sumScore(payload)),
});

Game.propTypes = {
  token: propTypes.string.isRequired,
  dispatchToken: propTypes.func.isRequired,
  sendAnswers: propTypes.func.isRequired,
  dispatchScore: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  settings: propTypes.objectOf(propTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
