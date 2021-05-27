import React, { Component } from 'react';

class PreviewButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false,
      placeholders: [],
    };
  }

  togglePreview = (e) => {
    e.preventDefault();
    this.setState({ preview: !this.state.preview });

    let buttons = document.querySelectorAll('button');
    let previewButton = document.querySelector('.btn-preview');
    let forms = document.querySelectorAll('form');
    let inputs = document.querySelectorAll('input');
    let placeholders = [];

    buttons.forEach((button) => {
      if (button.style.display !== 'none') {
        button.style.display = 'none';
      } else {
        button.style.display = 'block';
        if (!this.state.preview) {
          document.querySelector('.add-form-buttons').style.display = 'flex';
        }
      }
    });

    forms.forEach((form) => {
      if (form.style.display !== 'none') {
        form.style.display = 'none';
      } else {
        form.style.display = 'grid';
      }
    });

    previewButton.style.display = 'block';

    this.restorePlaceholderText(placeholders, inputs);
  };

  restorePlaceholderText = (placeholders, inputs) => {
    if (!this.state.preview) {
      inputs.forEach((input) => {
        placeholders.push(input.getAttribute('placeholder'));

        this.setState({
          placeholders,
        });

        console.log(
          'placeholder array of text updated to ' + placeholders.join(',')
        );
        input.setAttribute('placeholder', '');
      });
    } else {
      inputs.forEach((input, index) => {
        input.setAttribute('placeholder', this.state.placeholders[index]);
      });
    }
  };

  render() {
    return (
      <button onClick={this.togglePreview} className="btn btn-preview">
        {this.state.preview ? 'Edit' : 'Preview'}
      </button>
    );
  }
}

export default PreviewButton;
