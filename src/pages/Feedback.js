import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends Component {
  render() {
    const { rightAnswers } = this.props;
    const AVALIATOR = 3;
    return (
      <div>
        <HeaderFeedback />
        { (rightAnswers < AVALIATOR) ? (
          <h4 data-testid="feedback-text">Could be better...</h4>
        ) : (
          <h4 data-testid="feedback-text">Well Done!</h4>
        )}
        {/* <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            history.push('/');
          } }
        >
          {' '}
          JOGAR NOVAMENTE
          {' '}

        </button>
        <button
          type="button"
          data-testid="ranking-title"
          onClick={ () => {
            history.push('/ranking');
          } }
        >
          VER RANKING

        </button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rightAnswers: state.player.assertions,
});

Feedback.propTypes = {
  rightAnswers: propTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
