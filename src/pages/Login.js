import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login, setToken } from '../actions/index';
import { fetchToken } from '../services/fetch';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      name: '',
      gravatarEmail: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.goSettings = this.goSettings.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('ranking', JSON.stringify([]));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton() {
    this.setState({
      isDisabled: true,
    });
    const { gravatarEmail, name } = this.state;
    if (gravatarEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && name) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  async handleClick() {
    const { name, gravatarEmail } = this.state;
    const { history, dispatchLogin, dispatchToken } = this.props;
    dispatchLogin({
      name,
      gravatarEmail,
    });
    const token = await fetchToken();
    dispatchToken(token);
    history.push('/game');
  }

  goSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { gravatarEmail, name, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              name="gravatarEmail"
              data-testid="input-gravatar-email"
              type="email"
              onChange={ this.handleChange }
              value={ gravatarEmail }
            />
          </label>

          <label htmlFor="name">
            Nome:
            <input
              name="name"
              data-testid="input-player-name"
              type="text"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goSettings }
        >
          SETTINGS
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (payload) => dispatch(login(payload)),
  dispatchToken: (token) => dispatch(setToken(token)),
});

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatchLogin: propTypes.func.isRequired,
  dispatchToken: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
