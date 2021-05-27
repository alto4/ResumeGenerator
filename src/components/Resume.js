import React from 'react';
import ResumeHeader from './ResumeHeader';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import PreviewButton from './PreviewButton';

class Resume extends React.Component {
  constructor(props) {
    super(props);

    // Hold state of all entries from edit mode
    this.state = {
      name: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      githubURL: '',
      linkedinURL: '',
      portfolioURL: '',
      education: [],
      experience: [],
    };
  }

  // Capture changes made to input fields
  onChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;

    this.setState((state, props) => ({
      [target]: value,
    }));
  };

  // Add a new entry to corresponding resume section by adding to array of related entries
  addEntry = (entry, section) => {
    this.setState({
      [section]: [...this.state[section], entry],
    });
  };

  // Delete target entry from state
  deleteEntry = (index, section) => {
    let entries = [...this.state[section]];

    if (index !== -1) {
      entries.splice(index, 1);
      this.setState({ [section]: entries });
    }
  };

  // Update an existing entry
  editEntry = (index, section, updatedEntry) => {
    let entries = this.state[section];
    let entry = entries[index];
    let keys = Object.keys(entry);

    // Update all keys within object containing entry details to reflect most recently submitted input
    keys.forEach((key) => {
      entry[key] = updatedEntry[key];
    });

    this.setState({ [section]: entries });
  };

  render() {
    return (
      <div className="resume-container">
        <PreviewButton />
        <ResumeHeader onChange={this.onChange} />
        <EducationSection
          addEducation={this.addEntry}
          editEducation={this.editEntry}
          removeEducation={this.deleteEntry}
          entries={this.state.education}
        />
        <ExperienceSection
          addExperience={this.addEntry}
          editExperience={this.editEntry}
          removeExperience={this.deleteEntry}
          entries={this.state.experience}
        />
      </div>
    );
  }
}

export default Resume;
