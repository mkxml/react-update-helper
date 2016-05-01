import { getPropList, getComponentName } from '../src/util';
import SmartComponent from './fixtures/SmartComponent';
import DumbComponent from './fixtures/DumbComponent';

describe('util', () => {
  it('should get the props from propTypes of smart component', () => {
    // window.console.log('Root', renderedComponent.root);
    expect(getPropList(new SmartComponent()).length).to.eql(2);
  });
  it('should get the props from propTypes of dumb component', () => {
    expect(getPropList(DumbComponent).length).to.eql(2);
  });
  it('should return empty object when props cannot be found', () => {
    expect(getPropList({}).length).to.eql(0);
  });
  it('should get the name of the SmartComponent', () => {
    expect(getComponentName(new SmartComponent())).to.eql('SmartComponent');
  });
  it('should get the name of the DumbComponent', () => {
    expect(getComponentName(DumbComponent)).to.eql('DumbComponent');
  });
  it('should get the name from property displayName', () => {
    const fake = function Test() {};
    fake.displayName = 'Test';
    expect(getComponentName(fake)).to.eql('Test');
  });
  it('should get the name from property name', () => {
    const fake = function Test() {};
    expect(getComponentName(fake)).to.eql('Test');
  });
});
