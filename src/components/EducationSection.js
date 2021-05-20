import { render } from '@testing-library/react';
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
    console.log('clicked');
  };

  addNewEntry = (e) => {
    e.preventDefault();
    this.props.addEducation(
      {
        credential: 'Bachelor of Music',
        program: 'Comprehensive, Classical Guitar',
        school: 'Wilfrid Laurier University',
        date: '2011-2015',
        description: [
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
  };

  render() {
    return (
      <div className="education-section">
        <h2>Education</h2>
        <button className="btn btn-add" onClick={this.toggleFormDisplay}>
          Add New Experience
        </button>

        {this.state.showForm && (
          <form>
            <h4>Add New Education Entry</h4>
            <button className="btn btn-add" onClick={this.addNewEntry}>
              Add Experience
            </button>
          </form>
        )}

        <div className="education-details-container">
          <article>
            {this.props.entries.map((entry, index) => {
              return (
                <div className="education-entry">
                  <h3>
                    {entry.credential} - {entry.program}{' '}
                    <span>{entry.date}</span>
                  </h3>
                  <button
                    className="btn btn-delete"
                    data-id={index}
                    onClick={this.removeEntry}
                  >
                    X
                  </button>
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
            <h3>Test</h3>
          </article>
        </div>
      </div>
    );
  }
}

export default EducationSection;
