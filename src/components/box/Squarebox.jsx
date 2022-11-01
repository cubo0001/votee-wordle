

import React from "react";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

const SquareboxComponent = ({content}) => {
  const parseColorWithStatus = {
    'absent': 'red',
    'present': 'yellow',
    'correct': 'green'
  }

  return (
    <div className="box" style={{"backgroundColor": parseColorWithStatus[Object.values(content)[0]]}}><span>{Object.keys(content)[0]}</span></div>
  );
}

export default SquareboxComponent
  
