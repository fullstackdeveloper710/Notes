import React from 'react'

const Heading = ({title,...rest}) => {
  return (
    <h1 {...rest}>{title}</h1>
  )
}

export default Heading