import React, { Component } from 'react';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends Component {
  render() {
    return (
      <div>
        <HeaderFeedback />
        <p data-testid="feedback-text" />
      </div>
    );
  }
}

export default Feedback;
