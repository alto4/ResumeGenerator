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

  render() {
    return (
      <div className="resume-container">
        <ResumeHeader onChange={this.onChange} />
        <EducationSection />
        <ExperienceSection />
      </div>
    );
  }
}

export default Resume;
