import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { restartGame } from '../actions/index';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      players: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const local = localStorage.getItem('ranking');
    const array = JSON.parse(local);
    this.setState({
      players: array,
    });
  }

  handleClick() {
    const { history, restart } = this.props;
    restart();
    history.push('/');
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          HOME
        </button>
        {
          players.sort((a, b) => b.score - a.score).map((player, index) => (
            <div key={ player.score }>
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  restart: () => dispatch(restartGame()),
});

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  restart: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
