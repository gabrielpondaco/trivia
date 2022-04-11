import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class HeaderFeedback extends Component {
  componentDidMount() {
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const saveLocal = JSON.parse(localStorage.getItem('ranking'));
    const { assertions, score, name, email } = this.props;
    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);
    const hashedEmail = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hashedEmail}`;
    const obj = {
      name,
      score,
      picture,
    };
    const saveStorage = JSON.stringify([...saveLocal, obj]);
    localStorage.setItem('ranking', saveStorage);
  }

  render() {
    const { email, name, score } = this.props;
    const hashedEmail = md5(email).toString();
    return (
      <header className="">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashedEmail}` }
          alt="img-profile"
          className="img-avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

HeaderFeedback.propTypes = {
  email: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  assertions: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(HeaderFeedback);
