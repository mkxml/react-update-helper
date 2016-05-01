import debug from 'debug';
import { is } from 'immutable';
import union from 'lodash.union';
import keys from 'lodash.keys';
import { getPropList, getComponentName } from './util';

/**
 * @typedef {Object} Change
 * @property {string} component the component name
 * @property {string} type string containing either 'props' or 'state'
 * @property {any} from the original value of the change
 * @property {any} to the new value of the change
 */

/**
 * The main color of the output log
 * @type {string}
 * @see http://stackoverflow.com/a/13017382/1468883
 * @since 1.0.0
 */
const COLOR = 'color: #07f';

/**
 * The default log funcion to be used
 * @type {function}
 * @since 1.0.0
 */
const logFunc = debug('ReactUpdateHelper');

/**
 * Log and return the changes in a component as they occur to help with debugging
 * @protected
 * @param {object} context - the component context
 * @param {object} context.props - the component props object
 * @param {object} context.state - the component state object
 * @param {object} nProps - the next props in the update process
 * @param {object} nState - the next state in the update process
 * @param {function} log - the log function to use when logging changes
 * @return {Array<Change>} - the changes that took place
 * @since 1.0.0
 */
function reportChanges(context, nProps, nState, log = logFunc) {
  const props = context.props || {};
  const state = context.state || {};
  const newProps = nProps || {};
  const newState = nState || {};
  const availableProps = getPropList(context);
  const stateKeys = union(keys(state), keys(newState));
  const name = getComponentName(context);
  const changes = [];
  availableProps.forEach((key) => {
    const oldValue = props[key];
    const newValue = newProps[key];
    if (!is(oldValue, newValue)) {
      changes.push({
        component: name,
        type: 'props',
        from: props[key],
        to: newProps[key],
      });
      log('%c %s: changed prop %s from %o to %o', COLOR, name, key, oldValue, newValue);
    }
  });
  stateKeys.forEach((key) => {
    const oldValue = state[key];
    const newValue = newState[key];
    if (!is(oldValue, newValue)) {
      changes.push({
        component: name,
        type: 'state',
        from: state[key],
        to: newState[key],
      });
      log('%c %s: changed state key %s from %o to %o', COLOR, name, key, oldValue, newValue);
    }
  });
  return changes;
}

// Exporting functions
export default {
  reportChanges,
};
