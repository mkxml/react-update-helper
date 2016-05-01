import React from 'react';
import { asPureComponent } from '../../src/index';

@asPureComponent
class DecoratorComponent extends React.Component {
  constructor() {
    super();
    this.updateCount = 0;
  }

  shouldComponentUpdate() {
    this.updateCount++;
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
