import React, { useState } from 'react';
import '../styles/NearbyEvents.css';

const EventsDisplay = ({ title, content, fields }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div><b>{isActive ? '-' : '+'}</b></div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
      {isActive && <div className="accordion-content">{fields}  <a href="https://www.travelportland.com/events/search/?start=2022-12-10&end=2022-12-30&type=">Click Here To Know More</a></div>}
    </div>
  );
};

export default EventsDisplay;