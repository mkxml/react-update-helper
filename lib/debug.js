'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _immutable = require('immutable');

var _lodash = require('lodash.union');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.keys');

var _lodash4 = _interopRequireDefault(_lodash3);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
var COLOR = 'color: #07f';

/**
 * The default log funcion to be used
 * @type {function}
 * @since 1.0.0
 */
var logFunc = (0, _debug2['default'])('ReactUpdateHelper');

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
function reportChanges(context, nProps, nState) {
  var log = arguments.length <= 3 || arguments[3] === undefined ? logFunc : arguments[3];

  var props = context.props || {};
  var state = context.state || {};
  var newProps = nProps || {};
  var newState = nState || {};
  var availableProps = (0, _util.getPropList)(context);
  var stateKeys = (0, _lodash2['default'])((0, _lodash4['default'])(state), (0, _lodash4['default'])(newState));
  var name = (0, _util.getComponentName)(context);
  var changes = [];
  availableProps.forEach(function (key) {
    var oldValue = props[key];
    var newValue = newProps[key];
    if (!(0, _immutable.is)(oldValue, newValue)) {
      changes.push({
        component: name,
        type: 'props',
        from: props[key],
        to: newProps[key]
      });
      log('%c %s: changed prop %s from %o to %o', COLOR, name, key, oldValue, newValue);
    }
  });
  stateKeys.forEach(function (key) {
    var oldValue = state[key];
    var newValue = newState[key];
    if (!(0, _immutable.is)(oldValue, newValue)) {
      changes.push({
        component: name,
        type: 'state',
        from: state[key],
        to: newState[key]
      });
      log('%c %s: changed state key %s from %o to %o', COLOR, name, key, oldValue, newValue);
    }
  });
  return changes;
}

// Exporting functions
exports['default'] = {
  reportChanges: reportChanges
};
module.exports = exports['default'];