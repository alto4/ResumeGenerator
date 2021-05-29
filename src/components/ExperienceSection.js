import React, { useState } from 'react';

const ExperienceSection = (props) => {
  // Store state of form display and form fields
  const [showForm, setShowForm] = useState(false);
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [entryEditing, setEntryEditing] = useState(null);
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState([]);

  // Show/hide education entry form
  const toggleFormDisplay = () => {
    setShowForm(!showForm);
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
    setEntryEditing(e.target.getAttribute('data-id'));

    // Populate edit form fields with data for corresponding entry
    let { position, company, location, date, description } =
      props.entries[e.currentTarget.getAttribute('data-id')];

    setPosition(position);
    setCompany(company);
    setLocation(location);
    setDate(date);
    setDescription(description);
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

  // Cancel add or edit form entry in progress
  const cancelEntry = (e) => {
    e.preventDefault();

    toggleFormDisplay();
  };

  // Submit new education entry based on current state of form fields
  const addNewEntry = (e) => {
    e.preventDefault();

    alert('HERE');
    // Pass new entry up to Resume component
    props.addExperience(
      {
        position,
        company,
        location,
        date,
        description: description.split(','),
      },
      'experience'
    );

    // Close form and clear all fields
    setDisplayAddForm(!displayAddForm);
    toggleFormDisplay();
    clearFormFields();
  };

  // Overwrite existing experience entry and pass up to Resume component
  const editEntry = (e) => {
    e.preventDefault();

    props.editExperience(entryEditing, 'experience', {
      position,
      company,
      location,
      date,
      description: description.split(','),
    });

    toggleFormDisplay();
    clearFormFields();
  };

  // Remove targetted experience entry from Resume component state array
  const removeEntry = (e) => {
    e.preventDefault();

    props.removeExperience(e.target.getAttribute('data-id'), 'experience');
  };

  // Clear potentially populated inputs to default state
  const clearFormFields = () => {
    setPosition('');
    setCompany('');
    setLocation('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="experience-section">
      <h2>Experience</h2>
      <button
        className="btn btn-add"
        onClick={(toggleFormDisplay, showAddForm)}
      >
        Add New Experience
      </button>

      {showForm && (
        <form>
          {displayAddForm && <h4>Add New Experience Entry</h4>}
          {displayEditForm && <h4>Edit Experience Entry</h4>}

          <label htmlFor="position">Position:</label>
          <input
            type="text"
            name="position"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            value={position}
          />

          <label htmlFor="company">Company:</label>
          <input
            type="text"
            name="company"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            value={company}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
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
            value={description}
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

      <div className="experience-details-container">
        <article>
          {props.entries &&
            props.entries.map((entry, index) => {
              return (
                <div className="experience-entry" key={index}>
                  <div className="experience-entry-header">
                    <h3>{entry.position}</h3>
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
                    <strong>
                      {entry.company} - {entry.location}
                    </strong>
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

export default ExperienceSection;
