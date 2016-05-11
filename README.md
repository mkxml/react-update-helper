# react-update-helper

[![Build]](https://travis-ci.org/mkautzmann/react-update-helper) [![SemVer]](http://semver.org/) [![Coverage]](https://coveralls.io/github/mkautzmann/react-update-helper?branch=master) [![Docs]](https://doc.esdoc.org/github.com/mkautzmann/react-update-helper/) [![License]](LICENSE)

A [React](https://facebook.github.io/react/) plugin to debug and accelerate your component updates.

It's compatible with [debug](https://github.com/visionmedia/debug) and [Immutable](https://facebook.github.io/immutable-js/).

## Goal

This react plugin basically does two things:

1. It helps you prevent useless component updates, thus improving your overall application performance.

2. It allows you to have a quick glimpse in why a component updated.

The idea combines thoughts of the works of the React team on [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html) and on a [post](https://medium.com/@tjholowaychuk/debugging-value-changes-in-react-s-shouldcomponentupdate-ae59b05c5371#.xig19l2nh) about React prop/state change debugging.

## Why and when to use this?

There are a few use cases:

- You want to use Immutable objects as your props or state values.
- You use Redux with Immutable state objects
- You want to debug props and state changes.
- Pair the component update logging with react-perf-addon to help busting performance issues.
- ...

Still don't know if you need this? Take a look at the [Usage](#usage) section.

## Install

It currently needs three peerDependencies.

- [React](https://facebook.github.io/react/)
- [debug](https://github.com/visionmedia/debug)
- [Immutable](https://facebook.github.io/immutable-js/)

This module is currently available only on [npm](https://www.npmjs.com/).

Install now:

`npm install react-update-helper --save`

You are done, check the [Usage](#usage) section to know how to use it.

**Why those peerDependencies?**

[React](https://facebook.github.io/react/) dependency is pretty obvious since this is a react plugin.

[Immutable](https://facebook.github.io/immutable-js/) is an optional choice but you might already be using it so there is no reason to duplicate the versions since this module just need the [is()](https://facebook.github.io/immutable-js/docs/#/is) function of the `immutable` package.

Even if you are not using Immutable on your own, most modern build systems like `webpack v2` or `rollup` will isolate the tiny bit of code this module need to operate.

As for [debug](https://github.com/visionmedia/debug), if you use it we don't duplicate code and if you don't it's a really tiny addition that allows you to turn console logging on/off and avoid the component update logging madness that happen in big apps.

## <a href="#" id="usage"></a>Usage

The package exposes two functions that you can use:

- `shouldUpdate`, the core update engine with Immutable support.
- `withPureRender`, the easy plug-and-play function with debug support.

#### withPureRender(Component)

The easiest way to get all the goods is using `withPureRender`.

You can use it as a [high order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.g1hqmwlh4):

```javascript
// Use react
import React from 'react';

// Use withPureRender
import { withPureRender } from 'react-update-helper';

// Create the component
class Greet extends React.Component {
  render() {
    return <div>Hello {this.props.greet}!</div>;
  }
}

// Enhance the Greet with withPureRender and export it
export default withPureRender(Greet);
```

You can use it as a ES7 decorator:

```javascript
// Use react
import React from 'react';

// Use withPureRender
import { withPureRender } from 'react-update-helper';

// Create the enhanced component
@withPureRender
class Greet extends React.Component {
  render() {
    return <div>Hello {this.props.greet}!</div>;
  }
}

// Export the already enhanced Greet
export default Greet;
```

It works with [pure components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) too:

```javascript
// Use react
import React from 'react';

// Use withPureRender
import { withPureRender } from 'react-update-helper';

// Create the component
function Greet({ greet }) {
  return <div>Hello {greet}!</div>;
}

// Enhance the Greet with withPureRender and export it
export default withPureRender(Greet);
```

#### shouldUpdate(componentContext, nextProps, nextState)

You can use the `shouldUpdate` function directly if you need to, like if you have more stuff to check when updating your component to improve performance.

Quick example of dening the greet prop value to change to falsy values while also maintaining the same value check with `shouldUpdate`:

```javascript
// Use react
import React from 'react';

// Use shouldUpdate
import { shouldUpdate } from 'react-update-helper';

// Create the component
class Greet extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    // Ignore change to falsy value
    if (!!nextProps.greet) return false;
    // Will only return true when stuff changes, even with Immutable objects
    return shouldUpdate(this, nextProps, nextState);
  }

  render() {
    return <div>Hello {this.props.greet}!</div>;
  }
}

// Just export Greet
export default Greet;
```

### Debugging updates

We use [debug](https://github.com/visionmedia/debug) to log component updates when in development environment and when debugging is enabled.

You can test this by enabling the namespace `ReactUpdateHelper` in `debug`.

Or you can just enable all namespaces with `*`.

In the browser you can do that as follows:

```javascript
// Just enabling react-update-helper messages
window.localStorage.debug = 'ReactUpdateHelper';

// Enabling all debug-powered logs
window.localStorage.debug = '*';
```

See more about debug in their [repository page](https://github.com/visionmedia/debug).

### Optimized in production

As React does, we disable any debug code when performing a production build.

Just make sure you are building setting environment variable `NODE_ENV` to `production` value and performing dead code elimination.

The concerns are the same as if you were building React for production usage in the first place.

If you use [Webpack](https://webpack.github.io/), [here](http://moduscreate.com/optimizing-react-es6-webpack-production-build/) is a nice guide.

#### Whole documentation

See the whole docs in the `docs` folder of this repo or [directly online](https://doc.esdoc.org/github.com/mkautzmann/react-update-helper/).

## Compatibility

Compatibility with [React](https://facebook.github.io/react/), [Immutable](https://facebook.github.io/immutable-js/) and [debug](https://github.com/visionmedia/debug) have been tested and should be maintained.

Though not tested, it should work with [react-native](https://facebook.github.io/react-native/) since it does not mess with DOM and browser specific APIs.

It can theorically work with [preact](https://github.com/developit/preact) when using [preact-compat](https://github.com/developit/preact-compat) since it mimics React's API and lifecycle.

## Contributing

This project is welcoming contributions of any kind! Here are some cool topics to get started:

- [ ] Can we make this README better?
- [ ] Improvements in the test suite.
- [ ] Improvements in the documentation.
- [ ] Updates in stale dependencies without breaking anything :smirk:

Please, before filing issues or sending PRs, read the [CONTRIBUTING](CONTRIBUTING.md) guide.

## License

[MIT](LICENSE)

[Build]: https://img.shields.io/travis/mkautzmann/react-update-helper.svg
[SemVer]: https://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[Coverage]: https://img.shields.io/coveralls/mkautzmann/react-update-helper/master.svg
[Docs]: docs/badge.svg
[License]: https://img.shields.io/npm/l/react-update-helper.svg
