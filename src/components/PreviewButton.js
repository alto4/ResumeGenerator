import React, { Component } from 'react';

class PreviewButton extends Component {
  constructor(props) {
    super(props);

    // Hold state of user mode and potentially removed placeholder contents
    this.state = {
      preview: false,
      placeholders: [],
    };
  }

  // Switch between preview and edit mode
  togglePreview = (e) => {
    e.preventDefault();
    this.setState({ preview: !this.state.preview });

    // Grab reference to all controls to be removed in preview mode and added back in for edit mode
    let buttons = document.querySelectorAll('button');
    let previewButton = document.querySelector('.btn-preview');
    let forms = document.querySelectorAll('form');
    let inputs = document.querySelectorAll('input');
    let placeholders = [];

    // Hide or show buttons depending on user mode
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

    // Hide or show forms depending on user mode
    forms.forEach((form) => {
      if (form.style.display !== 'none') {
        form.style.display = 'none';
      } else {
        form.style.display = 'grid';
      }
    });

    previewButton.style.display = 'block';

    // Call function to restore placeholders when in edit mode to guide user
    this.restorePlaceholderText(placeholders, inputs);
  };

  // Regenerate or gather placeholders depending on user mode
  restorePlaceholderText = (placeholders, inputs) => {
    if (!this.state.preview) {
      // Add all placeholder text to state for reuse when toggling back to edit mode
      inputs.forEach((input) => {
        placeholders.push(input.getAttribute('placeholder'));

        this.setState({
          placeholders,
        });

        // Once stored, remove all placeholder values
        input.setAttribute('placeholder', '');
      });
    } else {
      // If going back to edit mode, reassign placeholder text to inputs in resume header section
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
