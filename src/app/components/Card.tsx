import React, { ReactNode } from 'react'

const Card = ({children} : {children : ReactNode}) => {
  return (
    <div className="bg-white rounded-xl  p-4 shadow-md cursor-pointer">
        {children}
    </div>
  )
}

export default Card