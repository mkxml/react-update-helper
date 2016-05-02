import { getComponentName } from '../src/util';
import SmartComponent from './fixtures/SmartComponent';
import DumbComponent from './fixtures/DumbComponent';

describe('util', () => {
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
