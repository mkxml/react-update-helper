import React from 'react';
import keys from 'lodash.keys';
import { is } from 'immutable';
import { getComponentName } from './util';

/**
 * @external {React.Component} https://facebook.github.io/react/docs/component-api.html
 */

/**
 * Simply checks if a component update is needed
 * @public
 * @param {object} context - the component context, containing the current props and state values
 * @param {object} nProps - the next props in the update process
 * @param {object} nState - the next state in the update process
 * @return {boolean} - true if should update the component else false
 * @since 1.0.0
 */
export function shouldUpdate({ props, state }, nProps, nState) {
  const propsKeys = keys(props || {});
  const stateKeys = keys(state || {});
  const nPropsKeys = keys(nProps || {});
  const nStateKeys = keys(nState || {});
  if (propsKeys.length !== nPropsKeys.length || stateKeys.length !== nStateKeys.length) {
    return true;
  }
  for (let i = 0, l = propsKeys.length; i < l; i += 1) {
    const key = propsKeys[i];
    if (!Object.prototype.hasOwnProperty.call(nProps, key)) {
      return true;
    }
    if (!is(props[key], nProps[key])) {
      return true;
    }
  }
  for (let i = 0, l = stateKeys.length; i < l; i += 1) {
    const key = stateKeys[i];
    if (!Object.prototype.hasOwnProperty.call(nState, key)) {
      return true;
    }
    if (!is(state[key], nState[key])) {
      return true;
    }
  }
  return false;
}

/**
 * Enhances a component with change checks and console logs powered by debugjs
 * @public
 * @example
 * // Usage as a high order component
 * class MyComponent extends React.Component {
 *  render() { return <p>Hello World!</p>; }
 * }
 * withDebugInfo(MyComponent); // Your enhanced component
 * @param {React.Component} Component - the component to be enhanced
 * @return {React.Component} - the enhanced component
 * @since 2.0.0
 */
export function withDebugInfo(Component) {
  let debug;
  return class extends React.Component {
    static displayName = getComponentName(Component);

    static propTypes = Component.propTypes;

    shouldComponentUpdate(nextProps, nextState) {
      debug = debug || require('./debug');
      debug.reportChanges(this, nextProps, nextState);
      return shouldUpdate(this, nextProps, nextState);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}

/**
 * Encapsulates the shouldUpdate logic as a high order function
 * @public
 * @example
 * // Usage as a high order component
 * class MyComponent extends React.Component {
 *  render() { return <p>Hello World!</p>; }
 * }
 * withPureRender(MyComponent); // Your enhanced component
 * @param {React.Component} PureComponent - the component to be enhanced
 * @return {React.Component} - the enhanced component
 * @since 1.0.0
 */
export function withPureRender(PureComponent) {
  return class extends React.Component {

    static displayName = getComponentName(PureComponent);

    static propTypes = PureComponent.propTypes;

    shouldComponentUpdate(nextProps, nextState) {
      return shouldUpdate(this, nextProps, nextState);
    }

    render() {
      return <PureComponent {...this.props} />;
    }
  };
}
