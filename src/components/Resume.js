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

    console.log(`Changing handling here! target ${target}: ${value}`);

    this.setState((state, props) => ({
      [e.target.name]: value,
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
    alert(`Editing now in ${section} section.`);

    let entries = [...this.state[section]];

    entries[index] = updatedEntry;
    this.setState({ [section]: entries });
  };

  render() {
    return (
      <div className="resume-container">
        <ResumeHeader onChange={this.onChange} />
        <EducationSection
          addEducation={this.addEntry}
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
