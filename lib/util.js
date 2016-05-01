'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.keys');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Get the props name list of the given React component
 * @protected
 * @param {object} ctx - the component context, containing the name, props and state values
 * @return {array} - the props names
 * @since 1.0.0
 */
function getPropList(ctx) {
  return (0, _lodash2['default'])(ctx.constructor.propTypes || ctx.propTypes || {});
}

/**
 * Get the name of the given React component
 * @protected
 * @param {object} ctx - the component context, containing the name, props and state values
 * @return {string} - the component name
 * @since 1.0.0
 */
function getComponentName(ctx) {
  return ctx.constructor.displayName || ctx.displayName || ctx.name || ctx.constructor.name;
}

// Exporting functions
exports['default'] = {
  getPropList: getPropList,
  getComponentName: getComponentName
};
module.exports = exports['default'];