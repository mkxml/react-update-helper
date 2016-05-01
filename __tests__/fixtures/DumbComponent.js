import React from 'react';

function DumbComponent({ prop1, prop2 }) {
  return <div id={prop1}>{prop2}</div>;
}

DumbComponent.displayName = 'DumbComponent';

DumbComponent.propTypes = {
  prop1: React.PropTypes.string,
  prop2: React.PropTypes.string,
};

export default DumbComponent;
