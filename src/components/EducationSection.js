import React from 'react';

class EducationSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showAddForm: false,
      showEditForm: false,
      entryEditing: null,
      credential: '',
      school: '',
      date: '',
      program: '',
      description: [''],
    };
  }

  toggleFormDisplay = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  showAddForm = (e) => {
    this.clearFormFields();
    e.preventDefault();
    if (this.state.showForm === false) {
      this.toggleFormDisplay();
    }

    this.setState({ showAddForm: true, showEditForm: false });
  };

  showEditForm = (e) => {
    e.preventDefault();

    if (this.state.showForm === false) {
      this.toggleFormDisplay();
    }

    this.setState({
      showEditForm: true,
      showAddForm: false,
      entryEditing: e.target.getAttribute('data-id'),
    });

    let { credential, program, school, date, description } =
      this.props.entries[e.target.getAttribute('data-id')];

    this.setState({ credential, program, school, date, description });
  };

  cancelEntry = (e) => {
    e.preventDefault();

    this.toggleFormDisplay();
  };

  addNewEntry = (e) => {
    e.preventDefault();

    let credential = this.state.credential;
    let program = this.state.program;
    let school = this.state.school;
    let date = this.state.date;
    let description = this.state.description;

    this.props.addEducation(
      {
        credential,
        program,
        school,
        date,
        description: description.split(','),
      },
      'education'
    );

    this.setState({ showAddForm: !this.state.showAddForm });
    this.toggleFormDisplay();
    this.clearFormFields();
  };

  editEntry = (e) => {
    e.preventDefault();

    this.props.editEducation(this.state.entryEditing, 'education', {
      credential: this.state.credential,
      date: this.state.date,
      school: this.state.school,
      program: this.state.program,
      description: this.state.description.split(','),
    });

    this.toggleFormDisplay();
    this.clearFormFields();
  };

  removeEntry = (e) => {
    e.preventDefault();

    this.props.removeEducation(e.target.getAttribute('data-id'), 'education');
  };

  clearFormFields = () => {
    this.setState({
      credential: '',
      program: '',
      school: '',
      date: '',
      description: '',
    });
  };

  onChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;

    this.setState((state, props) => ({
      [target]: value,
    }));
  };

  render() {
    return (
      <div className="education-section">
        <h2>Education</h2>
        <button
          className="btn btn-add"
          onClick={(this.toggleFormDisplay, this.showAddForm)}
        >
          Add New Education
        </button>

        {this.state.showForm && (
          <form>
            {this.state.showAddForm && <h4>Add New Education Entry</h4>}
            {this.state.showEditForm && <h4>Edit Education Entry</h4>}

            <label htmlFor="credential">Credential:</label>
            <input
              type="text"
              name="credential"
              onChange={this.onChange}
              value={this.state.credential}
            />

            <label htmlFor="program">Program:</label>
            <input
              type="text"
              name="program"
              onChange={this.onChange}
              value={this.state.program}
            />

            <label htmlFor="school">School:</label>
            <input
              type="text"
              name="school"
              onChange={this.onChange}
              value={this.state.school}
            />

            <label htmlFor="date">Date:</label>
            <input
              type="text"
              name="date"
              onChange={this.onChange}
              value={this.state.date}
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              onChange={this.onChange}
              description={this.state.description}
            />

            {this.state.showAddForm && (
              <div className="add-form-buttons">
                <button className="btn btn-add" onClick={this.addNewEntry}>
                  Add
                </button>
                <button className="btn btn-cancel" onClick={this.cancelEntry}>
                  Cancel
                </button>
              </div>
            )}

            {this.state.showEditForm && (
              <div className="edit-form-buttons">
                <button className="btn btn-edit" onClick={this.editEntry}>
                  Edit
                </button>
                <button className="btn btn-cancel" onClick={this.cancelEntry}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        )}

        <div className="education-details-container">
          <article>
            {this.props.entries.map((entry, index) => {
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
                        onClick={this.removeEntry}
                      >
                        X
                      </button>
                      <button
                        className="btn btn-edit"
                        data-id={index}
                        onClick={this.showEditForm}
                      >
                        Edit
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
  }
}

export default EducationSection;
