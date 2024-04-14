import React from 'react'

const ClimateCard = ({city}) => {
  return (
    <div className='ClimateCardConatiner'>
        <div className='card'>
          <div className='font1'>{city.name}</div>
          <div>time:</div>
          <h1>climate:{city.weather[0].main}</h1>
          <div>{city.main.temp}</div>
        </div>
    </div>
  )
}

export default ClimateCard