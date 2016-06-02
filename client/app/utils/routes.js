/* eslint-env commonjs */

import _ from 'lodash';

let Routes = {};

try {
  Routes = require('../routes/routes.js');
} catch (e) {
  console.warn('Can not load route bundle routes.js'); // eslint-disable-line no-console
}

/**
 * Examples:
 *
 * addDefaultOpts([1, 2, 3], {}) => [1, 2, 3, {}]
 * addDefaultOpts([1, 2, 3, {format: "json"}], {locale: "en"}) => [1, 2, 3, {format: "json", locale: "en"}]
 * addDefaultOpts([1, 2, 3, {locale: "fr"}], {locale: "en"}) => [1, 2, 3, {locale: "fr"}]
 */
function addDefaultOpts(args, defaultOpts) {
  const argsArray = _.toArray(args);
  const last = _.last(argsArray);

  if (last && _.isObject(last)) {
    return _.initial(argsArray).concat([_.assign({}, defaultOpts, last)]);
  } else {
    return argsArray.concat([defaultOpts]);
  }
}

function routeNameToPathFnName(routeName) {
  return `${routeName}_path`;
}

function createSubset(fnNames, defaultOpts) {
  return fnNames.reduce((routeObject, fnName) => {
    const pathFn = Routes[fnName];

    if (pathFn) {
      const withDefaultOptsFn = function withDefaultOpts(...args) {
        return pathFn(...addDefaultOpts(args, defaultOpts));
      };

      // Copy the toString function.
      // It contains the path spec, which might be useful
      // For example:
      // single_conversation_path.toString => (/:locale)/:person_id/messages/:conversation_type/:id(.:format)
      withDefaultOptsFn.toString = pathFn.toString;

      const newRoute = {};
      newRoute[fnName] = withDefaultOptsFn;
      return _.assign({}, routeObject, newRoute);
    } else {
      throw new Error(`Couldn't find named route: '${fnName}'`);
    }
  }, {});
}

/**
 * Creates a subset of all routes.
 *
 * You can pass also `defaultOpts` object, for example for "locale"
 */
function subset(routesSubset, defaultOpts = {}) {
  return createSubset(routesSubset.map(routeNameToPathFnName), defaultOpts);
}

/**
 * Returns all routes. Use this ONLY in styleguide or in tests.
 */
function all(defaultOpts) {
  const allRoutes = _.keys(Routes).filter((key) => _.endsWith(key, '_path'));

  return createSubset(allRoutes, defaultOpts);
}

export { subset, all };
