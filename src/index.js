import React from 'react';
import { is } from 'immutable';
import { getComponentName } from './util';
import keys from 'lodash.keys';

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
function shouldUpdate({ props, state }, nProps, nState) {
  const propsKeys = keys(props || {});
  const stateKeys = keys(state || {});
  const nPropsKeys = keys(nProps || {});
  const nStateKeys = keys(nState || {});
  if (propsKeys.length !== nPropsKeys.length || stateKeys.length !== nStateKeys.length) {
    return true;
  }
  for (let i = 0, l = propsKeys.length; i < l; i++) {
    const key = propsKeys[i];
    if (!nProps.hasOwnProperty(key)) {
      return true;
    }
    if (!is(props[key], nProps[key])) {
      return true;
    }
  }
  for (let i = 0, l = stateKeys.length; i < l; i++) {
    const key = stateKeys[i];
    if (!nState.hasOwnProperty(key)) {
      return true;
    }
    if (!is(state[key], nState[key])) {
      return true;
    }
  }
  return false;
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
 * @example
 * // Usage as a component decorator
 * // ES7 decorator @withPureRender
 * class MyComponent extends React.Component {
 *  render() { return <p>Hello World!</p>; }
 * }
 * // You are all set!
 * @param {React.Component} PureComponent - the component to be enhanced
 * @return {React.Component} - the enhanced component
 * @since 1.0.0
 */
function asPureComponent(PureComponent) {
  return class extends React.Component {

    static displayName = getComponentName(PureComponent);

    static propTypes = PureComponent.propTypes;

    shouldComponentUpdate(nextProps, nextState) {
      if (process.env.NODE_ENV !== 'production') {
        require('./debug').reportChanges(this, nextProps, nextState);
      }
      return shouldUpdate(this, nextProps, nextState);
    }

    render() {
      return <PureComponent {...this.props} />;
    }
  };
}

// Exporting functions
export default {
  shouldUpdate,
  asPureComponent,
};
