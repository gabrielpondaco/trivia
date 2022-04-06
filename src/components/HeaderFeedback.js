import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class HeaderFeedback extends Component {
  render() {
    const { email, nome, score } = this.props;
    const hashedEmail = md5(email).toString();
    return (
      <header>
        <h1>Feedback</h1>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashedEmail}` }
          alt="img-profile"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nome: state.player.name,
  score: state.player.score,
});

HeaderFeedback.propTypes = {
  email: propTypes.string.isRequired,
  nome: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(HeaderFeedback);
