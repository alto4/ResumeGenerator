import React from 'react';

function ResumeHeader(props) {
  return (
    <div className="resume-header">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={props.onChange}
        className="name-input"
      />
      <div className="social-links">
        <div>
          <i className="fa fa-code fa-sm"></i>
          <input
            type="text"
            name="portfolioURL"
            placeholder="Portfolio URL"
            onChange={props.onChange}
          />
        </div>
        <div>
          <i className="fab fa-github"></i>
          <input
            type="text"
            name="githubURL"
            placeholder="GitHub URL"
            onChange={props.onChange}
          />
        </div>
        <div>
          <i className="fab fa-linkedin"></i>
          <input
            type="text"
            name="linkedinURL"
            placeholder="Linkedin URL"
            onChange={props.onChange}
          />
        </div>
      </div>

      <div className="contact-details">
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={props.onChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={props.onChange}
        />
        <div className="location-inputs">
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={props.onChange}
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            onChange={props.onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ResumeHeader;
