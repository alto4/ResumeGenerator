import React from 'react';

function EducationSection() {
  let showForm = false;

  const toggleFormDisplay = (e) => {
    e.preventDefault();
    showForm = !showForm;
  };

  return (
    <div className="education-section">
      <h2>Education</h2>
      <button className="btn btn-add" onClickCapture={toggleFormDisplay}>
        Add Experience
      </button>

      {showForm && <form>FORM</form>}
    </div>
  );
}

export default EducationSection;
