import React from 'react'
import './style.css'
import { TailSpin } from 'react-loader-spinner';

export default function LoadingComponent() {

    return(
      <div className="loading">
      <TailSpin 
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
  )
}
