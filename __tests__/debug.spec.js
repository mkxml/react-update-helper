import { reportChanges } from '../src/debug';
import { fakeComponent, newProps, newState } from './fixtures/fakeObjects';

// cancel show console output
window.console.log = x => x;

describe('debug', () => {
  it('should return array with changes', () => {
    const changes = reportChanges(fakeComponent, newProps, newState);
    expect(changes.length).to.eql(3);
  });
  it('should detect the component name automatically', () => {
    const changes = reportChanges(fakeComponent, newProps, newState);
    expect(changes[0].component).to.eql('Test');
  });
  it('should try to log the changes in the console', () => {
    // mock a log function, not using debug here
    const log = sinon.spy();
    reportChanges(fakeComponent, newProps, newState, log);
    expect(log.called).to.eql(true);
  });
  it('should detect changes in props', () => {
    const changes = reportChanges(fakeComponent, newProps, newState);
    expect(changes[0].type).to.eql('props');
  });
  it('should log addition of prop', () => {
    const log = sinon.spy();
    const newFake = { ...fakeComponent };
    newFake.props = { t0: 0 };
    const props = { t0: 0, t1: 1 };
    reportChanges(newFake, props, newFake.state, log);
    const fnCall = log.getCall(0);
    const correctMessage = [
      '%s: changed prop %s from %o to %o',
      'Test',
      't1',
      undefined,
      1,
    ];
    const messageLogged = fnCall.args;
    expect(messageLogged).to.eql(correctMessage);
  });
  it('should log removal of prop', () => {
    const log = sinon.spy();
    const newFake = { ...fakeComponent };
    newFake.props = { t0: 0, t1: 0 };
    const props = { t0: 0 };
    reportChanges(newFake, props, newFake.state, log);
    const fnCall = log.getCall(0);
    const correctMessage = [
      '%s: changed prop %s from %o to %o',
      'Test',
      't1',
      0,
      undefined,
    ];
    const messageLogged = fnCall.args;
    expect(messageLogged).to.eql(correctMessage);
  });
  it('should handle null props', () => {
    const log = sinon.spy();
    const newFake = { ...fakeComponent };
    newFake.props = null;
    newFake.state = { t0: 1 };
    reportChanges(newFake, null, newFake.state, log);
    expect(log.called).to.eql(false);
  });
  it('should detect changes in state', () => {
    const changes = reportChanges(fakeComponent, newProps, newState);
    expect(changes[2].type).to.eql('state');
  });
  it('should log addition of state key', () => {
    const log = sinon.spy();
    const newFake = { ...fakeComponent };
    newFake.state = { t0: 0 };
    const state = { t0: 0, t1: 1 };
    reportChanges(newFake, newFake.props, state, log);
    const fnCall = log.getCall(0);
    const correctMessage = [
      '%s: changed state key %s from %o to %o',
      'Test',
      't1',
      undefined,
      1,
    ];
    const messageLogged = fnCall.args;
    expect(messageLogged).to.eql(correctMessage);
  });
  it('should log removal of state key', () => {
    const log = sinon.spy();
    const newFake = { ...fakeComponent };
    newFake.state = { t0: 0, t1: 1 };
    const state = { t0: 0 };
    reportChanges(newFake, newFake.props, state, log);
    const fnCall = log.getCall(0);
    const correctMessage = [
      '%s: changed state key %s from %o to %o',
      'Test',
      't1',
      1,
      undefined,
    ];
    const messageLogged = fnCall.args;
    expect(messageLogged).to.eql(correctMessage);
  });
  it('should handle null state', () => {
    const log = sinon.spy();
    const newFake = { ...fakeComponent };
    newFake.props = { t0: 0 };
    newFake.state = null;
    reportChanges(newFake, newFake.props, null, log);
    expect(log.called).to.eql(false);
  });
  it('should format the log of props correctly', () => {
    const log = sinon.spy();
    reportChanges(fakeComponent, newProps, newState, log);
    const fnCall = log.getCall(0);
    const correctMessage = [
      '%s: changed prop %s from %o to %o',
      'Test',
      't1',
      0,
      1,
    ];
    const messageLogged = fnCall.args;
    expect(messageLogged).to.eql(correctMessage);
  });
  it('should format the log of state correctly', () => {
    const log = sinon.spy();
    reportChanges(fakeComponent, newProps, newState, log);
    const fnCall = log.getCall(2);
    const correctMessage = [
      '%s: changed state key %s from %o to %o',
      'Test',
      't1',
      undefined,
      0,
    ];
    const messageLogged = fnCall.args;
    expect(messageLogged).to.eql(correctMessage);
  });
});
