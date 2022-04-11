import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, nome, score } = this.props;
    const hashedEmail = md5(email).toString();
    return (
      <header className="d-flex justify-content-between">
        <div>
          <h3 data-testid="header-player-name">{ nome }</h3>
          <img
            src={ `https://www.gravatar.com/avatar/${hashedEmail}` }
            alt="img-profile"
            data-testid="header-profile-picture"
          />
        </div>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nome: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
