import React from 'react';

class ExperienceSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showAddForm: false,
      showEditForm: false,
      entryEditing: null,
      position: '',
      company: '',
      location: '',
      date: '',
      description: [],
    };
  }

  toggleFormDisplay = () => {
    this.setState({ showForm: !this.state.showForm });
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

    let { position, company, location, date, description } =
      this.props.entries[e.target.getAttribute('data-id')];

    this.setState({ position, company, location, date, description });
  };

  showAddForm = (e) => {
    this.clearFormFields();
    e.preventDefault();
    if (this.state.showForm === false) {
      this.toggleFormDisplay();
    }

    this.setState({ showAddForm: true, showEditForm: false });
  };

  cancelEntry = (e) => {
    e.preventDefault();

    this.toggleFormDisplay();
  };

  addNewEntry = (e) => {
    e.preventDefault();

    let position = this.state.position;
    let company = this.state.company;
    let location = this.state.location;
    let date = this.state.date;
    let description = this.state.description;

    console.log('adding to new experience' + position + company);
    alert('description value is ' + description);
    this.props.addExperience(
      {
        position,
        company,
        location,
        date,
        description: [
          description,
          'Teamwork skills',
          'Critical analysis skills',
          'Problem-solving skills',
        ],
      },
      'experience'
    );

    this.setState({ showAddForm: !this.state.showForm });
    this.toggleFormDisplay();
    this.clearFormFields();
  };

  editEntry = (e) => {
    e.preventDefault();

    this.props.editExperience(this.state.entryEditing, 'experience', {
      position: this.state.position,
      company: this.state.company,
      location: this.state.location,
      date: this.state.date,
      description: ['1', '2', '3'],
    });

    this.toggleFormDisplay();
    this.clearFormFields();
  };

  removeEntry = (e) => {
    e.preventDefault();

    this.props.removeExperience(e.target.getAttribute('data-id'), 'experience');
  };

  clearFormFields = () => {
    this.setState({
      position: '',
      company: '',
      location: '',
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
      <div className="experience-section">
        <h2>Experience</h2>
        <button
          className="btn btn-add"
          onClick={(this.toggleFormDisplay, this.showAddForm)}
        >
          Add New Experience
        </button>

        {this.state.showForm && (
          <form>
            {this.state.showAddForm && <h4>Add New Experience Entry</h4>}
            {this.state.showEditForm && <h4>Edit Experience Entry</h4>}

            <label htmlFor="position">Position:</label>
            <input
              type="text"
              name="position"
              onChange={this.onChange}
              value={this.state.position}
            />

            <label htmlFor="company">Company:</label>
            <input
              type="text"
              name="company"
              onChange={this.onChange}
              value={this.state.company}
            />

            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              onChange={this.onChange}
              value={this.state.location}
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
              value={this.state.description}
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

        <div className="experience-details-container">
          <article>
            {this.props.entries.map((entry, index) => {
              return (
                <div className="experience-entry" key={index}>
                  <div className="experience-entry-header">
                    <h3>{entry.position}</h3>
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
  }
}

export default ExperienceSection;
