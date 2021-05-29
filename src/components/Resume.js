import React, { useState } from 'react';
import ResumeHeader from './ResumeHeader';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import PreviewButton from './PreviewButton';

const Resume = () => {
  // Hold state of all entries from edit mode
  const [entries, setEntries] = useState({
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
  });

  // Capture changes made to input fields
  const onChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;

    setEntries({
      [target]: value,
    });
  };

  // Add a new entry to corresponding resume section by adding to array of related entries
  const addEntry = (entry, section) => {
    console.log(entries[section]);

    let currentEntries = [];

    if (entries[section]) {
      currentEntries = entries[section];
    }

    currentEntries.push(entry);

    setEntries({
      [section]: currentEntries,
    });

    // Experience entries
  };

  // Delete target entry from state
  const deleteEntry = (index, section) => {
    let updatedEntries = [...entries[section]];

    if (index !== -1) {
      updatedEntries.splice(index, 1);
      setEntries({ [section]: updatedEntries });
    }
  };

  // Update an existing entry
  const editEntry = (index, section, updatedEntry) => {
    let updatedEntries = entries[section];
    let entry = updatedEntries[index];
    let keys = Object.keys(entry);

    // Update all keys within object containing entry details to reflect most recently submitted input
    keys.forEach((key) => {
      entry[key] = updatedEntry[key];
    });

    setEntries({ [section]: entries });
  };

  return (
    <div className="resume-container">
      <PreviewButton />
      <ResumeHeader onChange={onChange} />
      <EducationSection
        addEducation={addEntry}
        editEducation={editEntry}
        removeEducation={deleteEntry}
        entries={entries.education}
      />
      <ExperienceSection
        addExperience={addEntry}
        editExperience={editEntry}
        removeExperience={deleteEntry}
        entries={entries.experience}
      />
    </div>
  );
};

export default Resume;
