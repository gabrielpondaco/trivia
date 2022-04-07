import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, fetchToken } from '../services/fetch';
import { setToken, sumScore,setAnswers } from '../actions/index';
import Timer from '../components/Timer';
import '../App.css';

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

  componentDidUpdate() {
    const { sendAnswers } = this.props;
    const { rightAnswers } = this.state;
    sendAnswers(rightAnswers);
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
    const correct = questions[questionNumber].correct_answer === answer;
    if (correct) {
      return 'green-border';
    }

    return 'red-border';
  }

  handleClickAnswered2(answer) {
    const { questions, questionNumber } = this.state;
    const correct = questions[questionNumber].correct_answer === answer;
    if (correct) {
      this.setState((prevState) => ({
        rightAnswers: prevState.rightAnswers + 1,
        answered: true,
      }));
    } else {
      this.setState({
        answered: true,
      });
    }
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

  handleClickAnswered({ target }) {
    const { dispatchScore } = this.props;
    this.setState({
      answered: true,
    });
    console.log(target.dataset.testid);
    if (target.dataset.testid === 'correct-answer') {
      this.setState((prevState) => ({
        point: prevState.point + this.calculatePoint(),
      }), () => {
        const { point } = this.state;
        dispatchScore(point);
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
    }), () => this.createAnswers());
  }

  handleTime(time) {
    this.setState({
      timeLeft: time,
    });
  }

  render() {
    const { questions, answers, answered, questionNumber, timeLeft } = this.state;
    return (
      <div>
        <h1>Game Page</h1>
        <Header />
        <Timer onChange={ this.handleTime } />
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
                    onClick={ () => this.handleClickAnswered(answer) }
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
        {answered || timeLeft === 0
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
