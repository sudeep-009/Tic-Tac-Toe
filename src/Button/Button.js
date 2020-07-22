import React from 'react';
import button from './Button.css';

const Button = (props) => {
  return (
    <button className="button" onClick={props.onclicked}>
      {props.Value}
    </button>
  );
};
export default Button;
