import React, { useState } from 'react';

const PreviewButton = () => {
  // Hold state of user mode and potentially removed placeholder contents
  const [preview, setPreview] = useState(false);
  const [placeholders, setPlaceholders] = useState([]);

  // Switch between preview and edit mode
  const togglePreview = (e) => {
    e.preventDefault();
    setPreview(!preview);

    // Grab reference to all controls to be removed in preview mode and added back in for edit mode
    let buttons = document.querySelectorAll('button');
    let previewButton = document.querySelector('.btn-preview');
    let forms = document.querySelectorAll('form');
    let inputs = document.querySelectorAll('.resume-header input');

    // Hide or show buttons depending on user mode
    buttons.forEach((button) => {
      if (button.style.display !== 'none') {
        button.style.display = 'none';
      } else {
        button.style.display = 'block';
        if (!preview) {
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
    restorePlaceholderText(placeholders, inputs);
  };

  // Regenerate or gather placeholders depending on user mode
  const restorePlaceholderText = (placeholders, inputs) => {
    if (!preview) {
      // Add all placeholder text to state for reuse when toggling back to edit mode
      inputs.forEach((input) => {
        placeholders.push(input.getAttribute('placeholder'));

        setPlaceholders(placeholders);

        // Once stored, remove all placeholder values
        input.setAttribute('placeholder', '');
      });
    } else {
      // If going back to edit mode, reassign placeholder text to inputs in resume header section
      inputs.forEach((input, index) => {
        input.setAttribute('placeholder', placeholders[index]);
      });
    }
  };

  return (
    <button onClick={togglePreview} className="btn btn-preview">
      {preview ? 'Edit' : 'Preview'}
    </button>
  );
};

export default PreviewButton;
