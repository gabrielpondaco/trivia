import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';
import { restartGame } from '../actions/index';
import feedbackIMG from '../images/feedback1.svg';
import '../css/feedback.css';

class Feedback extends Component {
  render() {
    const { rightAnswers, history, setScore, restart } = this.props;
    const AVALIATOR = 3;
    return (
      <div className="App-header d-flex justify-content-between flex-row">
        <div className="leftMargin d-flex justify-content-center flex-column">
          <HeaderFeedback />
          {(rightAnswers < AVALIATOR) ? (
            <h4 data-testid="feedback-text">
              Da pra melhorar!!!!
              <span role="img" aria-label="facepalm">🤦‍♀️</span>
            </h4>
          ) : (
            <h4 data-testid="feedback-text">
              Bom demais!!!
              <span role="img" aria-label="emoji">🧑‍🎓</span>
            </h4>
          )}
          <span data-testid="feedback-total-score">
            Placar Final:
            { `  ${setScore}` }
          </span>
          <span data-testid="feedback-total-question">
            Acertos:
            { ` ${rightAnswers}` }
          </span>
          <div className="mt-5">
            <button
              type="button"
              className="feedbackBtns me-3"
              data-testid="btn-play-again"
              onClick={ () => {
                restart();
                history.push('/');
              } }
            >
              Play Again
            </button>
            <button
              className="feedbackBtns"
              type="button"
              data-testid="btn-ranking"
              onClick={ () => {
                history.push('/ranking');
              } }
            >
              Ranking
            </button>
          </div>
        </div>
        <img src={ feedbackIMG } alt="feecback" className="feedbackIMG marginRight" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rightAnswers: state.player.assertions,
  setScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(restartGame()),
});

Feedback.propTypes = {
  rightAnswers: propTypes.number.isRequired,
  setScore: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  restart: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
