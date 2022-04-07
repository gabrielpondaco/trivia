import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends Component {
  render() {
    const { rightAnswers, history, setScore } = this.props;
    const AVALIATOR = 3;
    return (
      <div>
        <HeaderFeedback />
        {(rightAnswers < AVALIATOR) ? (
          <h4 data-testid="feedback-text">Could be better...</h4>
        ) : (
          <h4 data-testid="feedback-text">Well Done!</h4>
        )}
        <p>Placar Final:</p>
        <p data-testid="feedback-total-score">
          { setScore }
        </p>
        <p> Acertos: </p>
        <p data-testid="feedback-total-question">
          { rightAnswers }
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            history.push('/');
          } }
        >
          JOGAR NOVAMENTE

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            history.push('/ranking');
          } }
        >
          VER RANKING

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rightAnswers: state.player.assertions,
  setScore: state.player.score,
});

Feedback.propTypes = {
  rightAnswers: propTypes.number.isRequired,
  setScore: propTypes.number.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
