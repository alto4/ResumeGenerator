import React, { useState } from 'react';

const EducationSection = (props) => {
  // Store state of form display and form fields
  const [showForm, setShowForm] = useState(false);
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [entryEditing, setEntryEditing] = useState(null);
  const [credential, setCredential] = useState('');
  const [school, setSchool] = useState('');
  const [date, setDate] = useState('');
  const [program, setProgram] = useState('');
  const [description, setDescription] = useState([]);

  // Show/hide education entry form
  const toggleFormDisplay = () => {
    setShowForm(!showForm);
  };

  // Clear potentially populated inputs to default state
  const clearFormFields = () => {
    setCredential('');
    setProgram('');
    setSchool('');
    setDate('');
    setDescription('');
  };

  // Display add form after clearing potentially populated fields
  const showAddForm = (e) => {
    clearFormFields();
    e.preventDefault();

    // Ensure that clicking add button always results in an open form
    if (showForm === false) {
      toggleFormDisplay();
    }

    // Only ever allow a single input form to be displayed
    setDisplayAddForm(true);
    setDisplayEditForm(false);
  };

  // Display edit form
  const showEditForm = (e) => {
    e.preventDefault();

    // Ensure that clicking edit button always results in an open form
    if (showForm === false) {
      toggleFormDisplay();
    }

    // Update state to current form status and capture id of entry being targetted
    setDisplayEditForm(true);
    setDisplayAddForm(false);
    setEntryEditing(e.currentTarget.getAttribute('data-id'));

    // Populate edit form fields with data for corresponding entry
    let { credential, program, school, date, description } =
      props.entries[e.currentTarget.getAttribute('data-id')];

    setCredential(credential);
    setProgram(program);
    setSchool(school);
    setDate(date);
    setDescription(description);
  };

  // Cancel add or edit form entry in progress
  const cancelEntry = (e) => {
    e.preventDefault();

    toggleFormDisplay();
  };

  // Submit new education entry based on current state of form fields
  const addNewEntry = (e) => {
    e.preventDefault();

    // Pass new entry up to Resume component
    props.addEducation(
      {
        credential,
        program,
        school,
        date,
        description: description.split(','),
      },
      'education'
    );

    // Close form and clear all fields
    setDisplayAddForm(!showAddForm);
    toggleFormDisplay();
    clearFormFields();
  };

  // Overwrite existing education entry and pass up to Resume component
  const editEntry = (e) => {
    e.preventDefault();

    props.editEducation(entryEditing, 'education', {
      credential,
      date,
      school,
      program,
      description: description.split(','),
    });

    toggleFormDisplay();
    clearFormFields();
  };

  // Remove targetted education entry from Resume component state array
  const removeEntry = (e) => {
    e.preventDefault();

    props.removeEducation(e.target.getAttribute('data-id'), 'education');
  };

  return (
    <div className="education-section">
      <h2>Education</h2>
      <button
        className="btn btn-add"
        onClick={(toggleFormDisplay, showAddForm)}
      >
        Add New Education
      </button>

      {showForm && (
        <form>
          {displayAddForm && <h4>Add New Education Entry</h4>}
          {displayEditForm && <h4>Edit Education Entry</h4>}

          <label htmlFor="credential">Credential:</label>
          <input
            type="text"
            name="credential"
            onChange={(e) => {
              setCredential(e.target.value);
            }}
            value={credential}
          />

          <label htmlFor="program">Program:</label>
          <input
            type="text"
            name="program"
            onChange={(e) => {
              setProgram(e.target.value);
            }}
            value={program}
          />

          <label htmlFor="school">School:</label>
          <input
            type="text"
            name="school"
            onChange={(e) => {
              setSchool(e.target.value);
            }}
            value={school}
          />

          <label htmlFor="date">Date:</label>
          <input
            type="text"
            name="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            description={description}
          />

          {displayAddForm && (
            <div className="add-form-buttons">
              <button className="btn btn-add" onClick={addNewEntry}>
                Add
              </button>
              <button className="btn btn-cancel" onClick={cancelEntry}>
                Cancel
              </button>
            </div>
          )}

          {displayEditForm && (
            <div className="edit-form-buttons">
              <button className="btn btn-edit" onClick={editEntry}>
                Edit
              </button>
              <button className="btn btn-cancel" onClick={cancelEntry}>
                Cancel
              </button>
            </div>
          )}
        </form>
      )}

      <div className="education-details-container">
        <article>
          {props.entries.map((entry, index) => {
            return (
              <div className="education-entry" key={index}>
                <div className="education-entry-header">
                  <h3>
                    {entry.credential} - {entry.program}
                  </h3>

                  <div>
                    <span>{entry.date} </span>
                    <button
                      className="btn btn-delete"
                      data-id={index}
                      onClick={removeEntry}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-edit"
                      data-id={index}
                      onClick={showEditForm}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
                <p>
                  <strong>{entry.school}</strong>
                </p>

                <ul>
                  {entry.description.map((detail, index) => {
                    return <li key={index}>{detail}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
};

export default EducationSection;
