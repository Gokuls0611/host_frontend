import React from 'react'
import {ThreeDots} from 'react-loader-spinner'

export default function ButtonLoad() {
  return (
    <div className='load_button'>
      <ThreeDots
          color="White"
          height={16}
          width={40}
        />
      </div>
  )
}
