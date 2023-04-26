

import React from 'react'

const page= ({param}:{param:{id:number}}) => {
  return (
    <div>{param.id}</div>
  )
}

export default page