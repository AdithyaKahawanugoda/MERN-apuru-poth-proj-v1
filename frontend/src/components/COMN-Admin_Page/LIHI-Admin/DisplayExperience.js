import React, { useState } from 'react'
import SingleExperience from './SingleExperience'

const DisplayExperience = ({experience}) => {
  return (
    <div>
      <div className="card shadow mb-4 w-100">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">
            My Experiences
          </h4>
        </div>
        <div className="card-body">
          {experience.map((item) => (
            <SingleExperience
              title={item.title}
              company={item.company}
              description={item.description}
              from={item.from}
              to={item.to}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayExperience