# react-update-helper

**⚠️ DEPRECATED: This project is no longer useful. Please check alternatives like [React's Pure Component](https://reactjs.org/docs/react-api.html#reactpurecomponent) and [React's Dev Tools](https://github.com/facebook/react-devtools)**

[![Build]](https://travis-ci.org/mkxml/react-update-helper) [![SemVer]](http://semver.org/) [![Coverage]](https://coveralls.io/github/mkxml/react-update-helper?branch=master) [![License]](LICENSE)

A [React](https://facebook.github.io/react/) set of helpers to debug and accelerate your component updates.

It works with [debug](https://github.com/visionmedia/debug) and [Immutable](https://facebook.github.io/immutable-js/).

## Goal

This react kit is a set of two high order components ([HOCs](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.g1hqmwlh4)) that are useful for react app development:

1. `withPureRender` is the first enhancer. It helps you prevent useless component updates (even when using deep Immutable.JS objects).

2. `withDebugInfo` is the second one. It allows you to check why a component updated in your browser console.

The idea combines thoughts from [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html) and from a [blog post](https://medium.com/@tjholowaychuk/debugging-value-changes-in-react-s-shouldcomponentupdate-ae59b05c5371#.xig19l2nh) about React prop/state change debugging.

## Why and when to use these helpers?

Here are a few common uses:

- You might want to use `withPureRender` when
  - You want to use Immutable objects as your props or state values.
  - You use Redux with Immutable state objects

- You might want to use `withDebugInfo` when:
  - You want to debug props and state changes.
  - Pairing the component update logging with react-perf-addon to help busting performance issues.

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

As for [debug](https://github.com/visionmedia/debug), it is optional and will only be [required](https://nodejs.org/api/modules.html) if you use `withDebugInfo`.

## <a href="#" id="usage"></a>Usage

The package exposes one function and two component enhancers that you can use:

- `shouldUpdate`, the core update function with Immutable support. You may use it directly in your `shouldComponentUpdate`. Or you can easily switch to the enhancer approach of `withPureRender`.
- `withPureRender`, the easy plug-and-play enhancer HOC for any React component that will run `shouldUpdate` in every update attempt for you.
- `withDebugInfo`, the debug function you may use in development to log out a nice component change feed in the browser console.

#### withPureRender(Component)

The easiest way to get all the goods of automatic `shouldUpdate` is using `withPureRender`.

You can use it as a normal high order component as follows:

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

Or you can use it as a ES7 decorator if you support and like that way:

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

It works with [pure functional components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) too:

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

Use `withDebugInfo` for that matter:

```javascript
// Use react
import React from 'react';

// Use withPureRender
import { withDebugInfo } from 'react-update-helper';

// Create the component
class Greet extends React.Component {
  render() {
    return <div>Hello {this.props.greet}!</div>;
  }
}

// Enhance the Greet with withDebugInfo and export it
export default withDebugInfo(Greet);
```

We use [debug](https://github.com/visionmedia/debug) internally to log component updates when debugging is enabled.

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

#### Quick Tip: When debugging [Immutable](https://facebook.github.io/immutable-js/) objects use a custom formatter in the console

This [custom formatter](https://github.com/andrewdavey/immutable-devtools) for Chrome Dev Tools makes `Immutable` object debugging a breeze. It works perfectly with `react-update-helper`!

### No debug in production

As with React warnings, you should disable logs when running in a production environment.

Just make sure you are conditionally using `withDebugInfo` with an environment variable of sorts (like setting `NODE_ENV` to `production`) and performing dead code elimination.

The concerns are the same as if you were building React for production usage in the first place.

If you use [Webpack](https://webpack.github.io/), [here](http://moduscreate.com/optimizing-react-es6-webpack-production-build/) is a nice guide.

#### Whole documentation

See the whole docs in the `docs` folder of this repo or [directly online](https://doc.esdoc.org/github.com/mkxml/react-update-helper/).

## Compatibility

Compatibility with [React](https://facebook.github.io/react/), [Immutable](https://facebook.github.io/immutable-js/) and [debug](https://github.com/visionmedia/debug) have been tested and should be maintained.

Though not tested, it should work with [react-native](https://facebook.github.io/react-native/) since it does not mess with DOM and browser specific APIs.

It can theorically work with [preact](https://github.com/developit/preact) when using [preact-compat](https://github.com/developit/preact-compat) since it mimics React's API and lifecycle.

## Contributing

This project is welcoming contributions of any kind!

Please, before filing issues or sending PRs, read the [CONTRIBUTING](CONTRIBUTING.md) guide.

## License

[MIT](LICENSE)

[Build]: https://img.shields.io/travis/mkxml/react-update-helper.svg
[SemVer]: https://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[Coverage]: https://img.shields.io/coveralls/mkxml/react-update-helper/master.svg
[Docs]: https://doc.esdoc.org/github.com/mkxml/react-update-helper/badge.svg
[License]: https://img.shields.io/npm/l/react-update-helper.svg
