import React from 'react';
import { withDebugInfo } from '../../src/index';

class HighOrderComponent extends React.Component {
  constructor() {
    super();
    this.updateCount = 0;
  }

  shouldComponentUpdate() {
    this.updateCount += 1;
    return true;
  }

  render() {
    return <div>{this.updateCount}</div>;
  }
}

HighOrderComponent.propTypes = {
  test: React.PropTypes.string,
};

export default withDebugInfo(HighOrderComponent);
