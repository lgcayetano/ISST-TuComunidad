import React, { useState, useEffect } from 'react';

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const [state, setState] = useState({ finalCompleted: 0 });

    useEffect(() => {
        setTimeout(function () { setState({ finalCompleted: completed }); }, 200);
    }, []);
  
    const containerStyles = {
      height: 16,
      width: '100%',
      backgroundColor: "#cccccc",
      borderRadius: 4
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${state.finalCompleted}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 1s ease'
    }
  
    const labelStyles = {
      padding: '0 5px',
      color: 'white',
      position: 'relative',
      top: '-6px',
      fontSize: '12.5px',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;