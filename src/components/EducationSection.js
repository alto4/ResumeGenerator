import React from 'react';

class EducationSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
    };
  }

  toggleFormDisplay = (e) => {
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  };

  addNewEntry = (e) => {
    e.preventDefault();

    let credential = this.state.credential;
    let program = this.state.program;
    let school = this.state.school;
    let date = this.state.date;
    let description = this.state.description;

    alert('description value is ' + description);
    this.props.addEducation(
      {
        credential,
        program,
        school,
        date,
        description: [
          description,
          'Teamwork skills',
          'Critical analysis skills',
          'Problem-solving skills',
        ],
      },
      'education'
    );

    this.setState({ showForm: !this.state.showForm });
  };

  removeEntry = (e) => {
    e.preventDefault();
    console.log(
      'Clicked to remove with index of ' + e.target.getAttribute('data-id')
    );

    this.props.removeEducation(e.target.getAttribute('data-id'), 'education');
  };

  onChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;

    console.log(`Changing handling here! target ${target}: ${value}`);

    this.setState((state, props) => ({
      [e.target.name]: value,
    }));
  };

  render() {
    return (
      <div className="education-section">
        <h2>Education</h2>
        <button className="btn btn-add" onClick={this.toggleFormDisplay}>
          Add New Education
        </button>

        {this.state.showForm && (
          <form>
            <h4>Add New Education Entry</h4>

            <label htmlFor="credential">Credential:</label>
            <input type="text" name="credential" onChange={this.onChange} />

            <label htmlFor="program">Program:</label>
            <input type="text" name="program" onChange={this.onChange} />

            <label htmlFor="school">School:</label>
            <input type="text" name="school" onChange={this.onChange} />

            <label htmlFor="date">Date:</label>
            <input type="text" name="date" onChange={this.onChange} />

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" onChange={this.onChange} />

            <div className="add-form-buttons">
              <button className="btn btn-add" onClick={this.addNewEntry}>
                Add
              </button>
              <button className="btn btn-cancel">Cancel</button>
            </div>
          </form>
        )}

        <div className="education-details-container">
          <article>
            {this.props.entries.map((entry, index) => {
              return (
                <div className="education-entry">
                  <div className="education-entry-header">
                    <h3>
                      {entry.credential} - {entry.program}{' '}
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
                    </div>
                  </div>
                  <p>
                    <strong>{entry.school}</strong>
                  </p>

                  <ul>
                    {entry.description.map((detail) => {
                      return <li>{detail}</li>;
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
