import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setSettings } from '../actions/index';
import settingsIMG from '../image/settingsIMG.svg';

const EIGHT = 8;
const MULTIPLE_CHOICE = 'Multiple Choice';
const categories = ['Any Category', 'General Knowledge',
  'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music',
  'Entertainment: Musicals & Theatres', 'Entertainment: Television',
  'Entertainment: Video Games', 'Entertainment: Board Games', 'Science & Nature',
  'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports',
  'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals',
  'Vehicles', 'Entertainment: Comics', 'Science: Gadgets',
  'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoon & Animations'];
class Settings extends Component {
  constructor() {
    super();

    this.state = {
      category: '',
      difficulty: 'Easy',
      type: MULTIPLE_CHOICE,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleClick() {
    const { settings, history } = this.props;
    const { category, difficulty, type } = this.state;
    const newObj = {
      category: categories.indexOf(category) + EIGHT,
      difficulty: difficulty.toLowerCase(),
      type: '',
    };
    if (type === 'True / False') {
      newObj.type = 'boolean';
    }
    if (type === MULTIPLE_CHOICE) {
      newObj.type = 'multiple';
    }
    await settings(newObj);
    history.push('/');
  }

  render() {
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const types = [MULTIPLE_CHOICE, 'True / False'];
    const { category, difficulty, type } = this.state;
    return (
      <main>
        <img src={ settingsIMG } alt="pair programming" className="settingsIMG" />
        <form className="d-flex flex-column bd-highlight mb-3 formWidth">
          <div>
            <label htmlFor="category" className="form-label">
              Category:
              <select
                name="category"
                value={ category }
                onChange={ this.onInputChange }
                className="form-select"
              >
                {categories
                  .map((categoryy, index) => (
                    <option key={ categoryy } id={ index }>{ categoryy }</option>))}
              </select>
            </label>
          </div>

          <div className="mb-3 d-flex justify-content-between width marginLeft">
            <label htmlFor="difficulty" className="form-label">
              Difficulty:
              <select
                name="difficulty"
                value={ difficulty }
                onChange={ this.onInputChange }
                className="form-select"
              >
                {difficulties
                  .map((difficultyy) => (
                    <option key={ difficultyy }>{ difficultyy }</option>))}
              </select>
            </label>
            <label htmlFor="type" className="form-label text-start">
              Type:
              <select
                name="type"
                value={ type }
                onChange={ this.onInputChange }
                className="form-select"
              >
                {types
                  .map((typey) => <option key={ typey }>{ typey }</option>)}
              </select>
            </label>
          </div>
        </form>
        <button type="button" onClick={ this.handleClick } className="btn btn-dark">
          Apply Filter
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  settings: (payload) => dispatch(setSettings(payload)),
});

Settings.propTypes = {
  settings: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
