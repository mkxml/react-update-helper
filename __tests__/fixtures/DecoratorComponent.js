import React from 'react';
import { withPureRender } from '../../src/index';

@withPureRender
class DecoratorComponent extends React.Component {
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

DecoratorComponent.propTypes = {
  test: React.PropTypes.string,
};

export default DecoratorComponent;
