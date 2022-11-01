

import React from "react";
import SquareboxComponent from "../box/Squarebox";
import "./index.css";

const BoardComponent = ({rows, columns, content}) => {
  return (
      <>
      <div className='grid-container'>
      {rows && columns && [...Array(rows).keys()].map((row, indexRow) => (
          <div className='row' aria-label={"Row " + (parseInt(indexRow) + 1)}>
              {
                  [...Array(columns).keys()].map((column) => (
                    <SquareboxComponent content={typeof content[row][column] === 'object' && content[row][column] !== null ? content[row][column] : []}/>
                 ))
              }
          </div>
        ))}
      </div>
      </>
  );
}

export default BoardComponent
  
