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

  render() {
    return (
      <div className="resume-container">
        <ResumeHeader onChange={this.onChange} />
        <EducationSection
          addEducation={this.addEntry}
          entries={this.state.education}
        />
        <ExperienceSection
          addExperience={this.addEntry}
          entries={this.state.experience}
        />
      </div>
    );
  }
}

export default Resume;
