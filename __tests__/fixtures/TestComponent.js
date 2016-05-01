import React from 'react';
import { shouldUpdate } from '../../src/index';

class TestComponent extends React.Component {
  constructor() {
    super();
    this.updateCount = 0;
  }

  shouldComponentUpdate(newProps, newState) {
    const willUpdate = shouldUpdate(this, newProps, newState);
    if (willUpdate) this.updateCount++;
    return willUpdate;
  }

  render() {
    return <div>{this.updateCount}</div>;
  }
}

TestComponent.propTypes = {
  test: React.PropTypes.node,
};

export default TestComponent;
