import keys from 'lodash.keys';

/**
 * Get the props name list of the given React component
 * @protected
 * @param {object} ctx - the component context, containing the name, props and state values
 * @return {array} - the props names
 * @since 1.0.0
 */
function getPropList(ctx) {
  return keys(ctx.constructor.propTypes || ctx.propTypes || {});
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
export default {
  getPropList,
  getComponentName,
};
