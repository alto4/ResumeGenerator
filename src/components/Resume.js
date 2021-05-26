import React from 'react';
import ResumeHeader from './ResumeHeader';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';

class Resume extends React.Component {
  constructor(props) {
    super(props);
    // State management
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

  onChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;

    this.setState((state, props) => ({
      [target]: value,
    }));
  };

  addEntry = (entry, section) => {
    this.setState({
      [section]: [...this.state[section], entry],
    });
  };

  deleteEntry = (index, section) => {
    let entries = [...this.state[section]];

    if (index !== -1) {
      entries.splice(index, 1);
      this.setState({ [section]: entries });
    }
  };

  editEntry = (index, section, updatedEntry) => {
    let entries = this.state[section];
    let entry = entries[index];
    let keys = Object.keys(entry);

    keys.forEach((key) => {
      entry[key] = updatedEntry[key];
    });

    this.setState({ [section]: entries });
  };

  render() {
    return (
      <div className="resume-container">
        <ResumeHeader onChange={this.onChange} />
        <EducationSection
          addEducation={this.addEntry}
          editEducation={this.editEntry}
          removeEducation={this.deleteEntry}
          entries={this.state.education}
        />
        <ExperienceSection
          addExperience={this.addEntry}
          removeExperience={this.deleteEntry}
          entries={this.state.experience}
        />
      </div>
    );
  }
}

export default Resume;
