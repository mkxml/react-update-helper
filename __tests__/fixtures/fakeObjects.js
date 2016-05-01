import Immutable from 'immutable';

export const fakeComponent = {
  constructor: {
    displayName: 'Test',
    propTypes: {
      t1: true,
      t2: true,
      t3: true,
      t4: true,
    },
  },
  props: {
    t1: 0,
    t2: 0,
    t3: 0,
    t4: Immutable.Map({ foo: 'bar' }),
  },
  state: null,
};

export const newProps = {
  t1: 1,
  t2: 0,
  t3: -1,
  t4: Immutable.Map({ foo: 'bar' }),
};

export const newState = {
  t1: 0,
};
