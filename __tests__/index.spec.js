import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import TestComponent from './fixtures/TestComponent';
import DecoratorComponent from './fixtures/DecoratorComponent';
import HighOrderComponent from './fixtures/HighOrderComponent';
import { shouldUpdate } from '../src/index';
import { fakeComponent, newProps, newState } from './fixtures/fakeObjects';

// cancel show console output
window.console.log = x => x;

describe('main functionality', () => {
  describe('shouldUpdate', () => {
    it('should return true when props change', () => {
      const result = shouldUpdate(fakeComponent, newProps, null);
      expect(result).to.eql(true);
    });
    it('should return false when props stay the same', () => {
      const newFake = { ...fakeComponent };
      newFake.state = null;
      newFake.props = {
        t1: 1,
        t2: 0,
        t3: -1,
        t4: Immutable.Map({ foo: 'bar' }),
      };
      const result = shouldUpdate(newFake, newProps, null);
      expect(result).to.eql(false);
    });
    it('should return true when a prop is added', () => {
      const props = { ...fakeComponent.props, t5: 1 };
      const result = shouldUpdate(fakeComponent, props, null);
      expect(result).to.eql(true);
    });
    it('should return true when a prop is removed', () => {
      const props = {
        t1: 0,
        t2: 0,
        t3: 0,
      };
      const result = shouldUpdate(fakeComponent, props, null);
      expect(result).to.eql(true);
    });
    it('should return true when a prop changed from null', () => {
      const newFake = { ...fakeComponent };
      newFake.props = null;
      newFake.state = { t1: 0 };
      const props = { t0: 0 };
      const result = shouldUpdate(newFake, props, newState);
      expect(result).to.eql(true);
    });
    it('should return true when a prop is removed and other added at the same time', () => {
      const newFake = { ...fakeComponent };
      newFake.props = { t0: 0, t1: 0 };
      const props = { t0: 0, t2: 0 };
      const result = shouldUpdate(newFake, props, null);
      expect(result).to.eql(true);
    });
    it('should return true when state change', () => {
      const newFake = { ...fakeComponent };
      newFake.state = { t1: 1 };
      newFake.props = null;
      const result = shouldUpdate(newFake, null, newState);
      expect(result).to.eql(true);
    });
    it('should return false when state does not change', () => {
      const newFake = { ...fakeComponent };
      newFake.state = { t1: 0 };
      newFake.props = null;
      const result = shouldUpdate(newFake, null, newState);
      expect(result).to.eql(false);
    });
    it('should return true when a new state key is added', () => {
      const newFake = { ...fakeComponent };
      newFake.state = { t1: 0 };
      newFake.props = null;
      const state = { t1: 0, t2: 0 };
      const result = shouldUpdate(newFake, null, state);
      expect(result).to.eql(true);
    });
    it('should return true when a state key is removed', () => {
      const newFake = { ...fakeComponent };
      newFake.state = { t1: 0 };
      newFake.props = null;
      const state = {};
      const result = shouldUpdate(newFake, null, state);
      expect(result).to.eql(true);
    });
    it('should return true when state change from null', () => {
      const newFake = { ...fakeComponent };
      newFake.props = null;
      const result = shouldUpdate(newFake, null, newState);
      expect(result).to.eql(true);
    });
    it('should return true when a state key is removed and other added at the same time', () => {
      const newFake = { ...fakeComponent };
      newFake.state = { t0: 0, t1: 0 };
      newFake.props = null;
      const state = { t0: 0, t2: 0 };
      const result = shouldUpdate(newFake, null, state);
      expect(result).to.eql(true);
    });
    it('should return false when both props and state stay the same', () => {
      const props = { ...fakeComponent.props }; // deep copy props object
      const state = null;
      const result = shouldUpdate(fakeComponent, props, state);
      expect(result).to.eql(false);
    });
    it('should return false when both props and state are null', () => {
      const newFake = { ...fakeComponent };
      newFake.state = null;
      newFake.props = null;
      const props = null;
      const state = null;
      const result = shouldUpdate(newFake, props, state);
      expect(result).to.eql(false);
    });
    it('should ignore the order of the properties', () => {
      const props = { t2: 0, t1: 0, t4: Immutable.Map({ foo: 'bar' }), t3: 0 };
      const state = null;
      const result = shouldUpdate(fakeComponent, props, state);
      expect(result).to.eql(false);
    });
    it('should ignore the order of the state keys', () => {
      const newFake = { ...fakeComponent };
      newFake.props = null;
      newFake.state = { t1: 0, t2: 0 };
      const state = { t2: 0, t1: 0 };
      const result = shouldUpdate(newFake, null, state);
      expect(result).to.eql(false);
    });
    it('should detect change in nested Immutable objects', () => {
      const props = { ...fakeComponent.props, t4: Immutable.Map({ foo: 'baz' }) }; // change t4
      const state = null;
      const result = shouldUpdate(fakeComponent, props, state);
      expect(result).to.eql(true);
    });
    it('should check for value equality on Immutable objects', () => {
      const props = { ...fakeComponent.props, t4: Immutable.Map({ foo: 'bar' }) }; // same t4
      const state = null;
      const result = shouldUpdate(fakeComponent, props, state);
      expect(result).to.eql(false);
    });
  });
});
describe('withPureRender', () => {
  it('should work as a component decorator', () => {
    const renderedComponent = shallow(<DecoratorComponent test="foo" />);
    renderedComponent.setProps({ test: 'foo' });
    const updateCount = renderedComponent.html();
    expect(updateCount).to.eql('<div>0</div>');
  });
  it('should work as a high order component', () => {
    const renderedComponent = shallow(<HighOrderComponent test="foo" />);
    renderedComponent.setProps({ test: 'foo' });
    const updateCount = renderedComponent.html();
    expect(updateCount).to.eql('<div>0</div>');
  });
});
describe('integration', () => {
  describe('react', () => {
    it('should work with react lifecycle', () => {
      const renderedComponent = shallow(<TestComponent test="foo" />);
      // changing prop to force update
      renderedComponent.setProps({ test: 'bar' });
      const updateCount = renderedComponent.text();
      expect(updateCount).to.eql('1');
    });
    it('should not perform useless re-renders in practice', () => {
      const renderedComponent = shallow(<TestComponent test="foo" />);
      // same value, new reference check
      renderedComponent.setProps({ test: 'foo' });
      const updateCount = renderedComponent.text();
      expect(updateCount).to.eql('0');
    });
  });
  describe('react + Immutable', () => {
    it('should work with immutable prop change', () => {
      const renderedComponent = shallow(<TestComponent test={Immutable.Map({ test: 'foo' })} />);
      // changing prop to force update
      renderedComponent.setProps({ test: Immutable.Map({ test: 'bar' }) });
      const updateCount = renderedComponent.text();
      expect(updateCount).to.eql('1');
    });
    it('should not re-render when immutable value does not change', () => {
      const renderedComponent = shallow(<TestComponent test={Immutable.Map({ test: 'foo' })} />);
      renderedComponent.setProps({ test: Immutable.Map({ test: 'foo' }) });
      const updateCount = renderedComponent.text();
      expect(updateCount).to.eql('0');
    });
  });
  describe('react + debug', () => {
    it('should log changes when using withDebugInfo', () => {
      // spy on console log
      sinon.spy(window.console, 'log');
      const renderedComponent = shallow(<HighOrderComponent test="foo" />);
      // change, causing update
      renderedComponent.setProps({ test: 'bar' });
      const called = window.console.log.called;
      window.console.log.restore();
      expect(called).to.eql(true);
    });
  });
});
