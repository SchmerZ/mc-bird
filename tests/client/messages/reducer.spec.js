import React from 'react';

import reducer from '../../../src/client/messages/reducer';
import * as A from '../../../src/client/messages/actions';

const messageFactory = (postfix) => ({
  recipient: `79001005566-${postfix}`,
  originator: `Inbox-${postfix}`
});

const defaultState = (count) => {
  const items = new Array(count)
    .fill(null)
    .map((x, index) => messageFactory(index))
    .reverse();

  return {
    items,
    limit: 2,
    totalCount: count,
  }
};

describe('Messages list', () => {
  describe('Reducer', () => {
    it('should have initial state', () => {
      const nextState = reducer(undefined, {});
      expect(nextState).toMatchSnapshot();
    });

    it('should add new message on top and do not remove the last one if under limit', () => {
      const message = messageFactory(1);
      const nextState = reducer(defaultState(1), A.messageAdd({message}));

      expect(nextState).toMatchSnapshot();
    });

    it('should add new message on top and remove the last one if over limit', () => {
      const message = messageFactory(2);
      const nextState = reducer(defaultState(2), A.messageAdd({message}));

      expect(nextState).toMatchSnapshot();
    });
  });
});
