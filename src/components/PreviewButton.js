import React, { Component } from 'react';

class PreviewButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false,
    };
  }

  togglePreview = (e) => {
    e.preventDefault();
    this.setState({ preview: !this.state.preview });

    let buttons = document.querySelectorAll('button');
    let previewButton = document.querySelector('.btn-preview');

    buttons.forEach((button) => {
      if (button.style.display !== 'none') {
        button.style.display = 'none';
      } else {
        button.style.display = 'block';
      }
    });

    previewButton.style.display = 'block';
  };

  render() {
    return (
      <button onClick={this.togglePreview} className="btn-preview">
        {this.state.preview ? 'Edit' : 'Preview'}
      </button>
    );
  }
}

export default PreviewButton;
