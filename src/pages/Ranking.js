import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { restartGame } from '../actions/index';
import '../css/ranking.css';
import rankingIMG from '../image/fans.svg';
import ranking from '../image/ranking.png';

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
      <div className="">
        <div className="rankingStyle d-flex">
          <img src={ rankingIMG } alt="ranking" className="rankingIMG" />
          <img src={ ranking } alt="ranking" className="rankingLetras" />
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-go-home"
            className="rankingBtn"
          >
            Home
          </button>
          <div className="d-flex flex-wrap rankingWidth">
            {
              players.sort((a, b) => b.score - a.score).map((player, index) => (
                <div key={ player.score } className="me-5 d-flex flex-column">
                  <img src={ player.picture } alt={ player.name } className="rakingAvatar" />
                  <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                  <p data-testid={ `player-score-${index}` }>{ player.score }</p>
                </div>
              ))
            }
          </div>
        </div>
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
