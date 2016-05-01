'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _util = require('./util');

var _lodash = require('lodash.keys');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
function shouldUpdate(_ref, nProps, nState) {
  var props = _ref.props;
  var state = _ref.state;

  var propsKeys = (0, _lodash2['default'])(props || {});
  var stateKeys = (0, _lodash2['default'])(state || {});
  var nPropsKeys = (0, _lodash2['default'])(nProps || {});
  var nStateKeys = (0, _lodash2['default'])(nState || {});
  if (propsKeys.length !== nPropsKeys.length || stateKeys.length !== nStateKeys.length) {
    return true;
  }
  for (var i = 0, l = propsKeys.length; i < l; i++) {
    var key = propsKeys[i];
    if (!nProps.hasOwnProperty(key)) {
      return true;
    }
    if (!(0, _immutable.is)(props[key], nProps[key])) {
      return true;
    }
  }
  for (var _i = 0, _l = stateKeys.length; _i < _l; _i++) {
    var _key = stateKeys[_i];
    if (!nState.hasOwnProperty(_key)) {
      return true;
    }
    if (!(0, _immutable.is)(state[_key], nState[_key])) {
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
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'shouldComponentUpdate',
      value: function () {
        function shouldComponentUpdate(nextProps, nextState) {
          if (process.env.NODE_ENV !== 'production') {
            require('./debug').reportChanges(this, nextProps, nextState);
          }
          return shouldUpdate(this, nextProps, nextState);
        }

        return shouldComponentUpdate;
      }()
    }, {
      key: 'render',
      value: function () {
        function render() {
          return _react2['default'].createElement(PureComponent, this.props);
        }

        return render;
      }()
    }]);

    return _class;
  }(_react2['default'].Component), _class.displayName = (0, _util.getComponentName)(PureComponent), _class.propTypes = PureComponent.propTypes, _temp;
}

// Exporting functions
exports['default'] = {
  shouldUpdate: shouldUpdate,
  asPureComponent: asPureComponent
};
module.exports = exports['default'];