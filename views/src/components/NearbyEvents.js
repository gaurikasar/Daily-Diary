import React from 'react';
import EventsDisplay from './EventsDisplay';

const Events = () => {

  const accordionData = [
    {
      title: 'Christmas Festival of Lights',
      content: 'Friday, Nov. 25 – Friday, Dec. 30 (Closed Christmas Day)',
      fields: 'Exciting and largest Choral festival!'
                
    },
    {
      title: 'Wild Arts Festival',
      content: 'Dec. 10–11, 2022  Cost: $10 - $35',
      fields: 'Pacific Northwest’s premier art show & book fair celebrating the natural world.'
    },
    {
      title: 'A Pittock Mansion Christmas',
      content: 'Nov. 21, 2022–Jan. 4, 2023  Cost: $11.50 - $15.50',
      fields: 'A true Portland tradition to behold!'
    },
    {
      title: 'Farmers Market at Portland State University',
      content: 'Jan. 22–Dec. 17, 2022',
      fields: 'Conducted at Downtown PDX; this is a famous market!'
    }
  ];

  return (
    <div className="section">
      <h2 className="heading"><b>
        Events Around Us!!
        </b>
      </h2>
      <div className="accordion">
        {accordionData.map(({ title, content, fields }) => (
          <EventsDisplay title={title} content={content} fields={fields} />
        ))}
      </div>
    </div>
  );
};

export default Events;
