import React, { useState } from 'react';
import ResumeHeader from './ResumeHeader';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import PreviewButton from './PreviewButton';

const Resume = () => {
  // Hold state of all entries from edit mode
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [githubURL, setGithubURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [portfolioURL, setPortfolioURL] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const [entries, setEntries] = useState({
    education: [],
    experience: [],
  });

  // Capture changes made to input fields
  const onChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;

    switch (target) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'province':
        setProvince(value);
        break;
      case 'linkedinURL':
        setLinkedinURL(value);
        break;
      case 'githubURL':
        setGithubURL(value);
        break;
      case 'portfolioURL':
        setPortfolioURL(value);
        break;
      default:
        break;
    }
  };

  // Add a new entry to corresponding resume section by adding to array of related entries
  const addEntry = (entry, section) => {
    let currentEntries = [];

    section === 'education' && education.length > 0
      ? (currentEntries = [...education])
      : (currentEntries = [...experience]);

    currentEntries.push(entry);

    section === 'education'
      ? setEducation(currentEntries)
      : setExperience(currentEntries);

    // Experience entries
  };

  // Delete target entry from state
  const deleteEntry = (index, section) => {
    let updatedEntries = [];
    section === 'education'
      ? (updatedEntries = [...education])
      : (updatedEntries = [...experience]);

    let deleted = updatedEntries.splice(index, 1);

    section === 'education'
      ? setEducation(updatedEntries)
      : setExperience(updatedEntries);

    console.log(index + ' has been removed?');
    console.log('Updated now array has ' + updatedEntries.length + ' entries.');
  };

  // Update an existing entry
  const editEntry = (index, section, updatedEntry) => {
    let updatedEntries = [];
    section === 'education'
      ? (updatedEntries = education)
      : (updatedEntries = experience);
    let entry = updatedEntries[index];
    let keys = Object.keys(entry);

    // Update all keys within object containing entry details to reflect most recently submitted input
    keys.forEach((key) => {
      entry[key] = updatedEntry[key];
    });

    section === 'education'
      ? setEducation(updatedEntries)
      : setExperience(updatedEntries);
  };

  return (
    <div className="resume-container">
      <PreviewButton />
      <ResumeHeader onChange={onChange} />
      <EducationSection
        addEducation={addEntry}
        editEducation={editEntry}
        removeEducation={deleteEntry}
        entries={education}
      />
      <ExperienceSection
        addExperience={addEntry}
        editExperience={editEntry}
        removeExperience={deleteEntry}
        entries={experience}
      />
    </div>
  );
};

export default Resume;
