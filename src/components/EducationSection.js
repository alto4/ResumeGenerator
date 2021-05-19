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
    this.props.addEducation(
      { title: 'Grad School', school: 'Laurier' },
      'education'
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
      </div>
    );
  }
}

export default EducationSection;
