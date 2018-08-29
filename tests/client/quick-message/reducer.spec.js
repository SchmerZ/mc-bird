import React from 'react';

import reducer from '../../../src/client/quick-message/reducer';
import * as A from '../../../src/client/quick-message/actions';

describe('Quick message form', () => {
  describe('Reducer', () => {
    it('should have initial state', () => {
      const nextState = reducer(undefined, {});
      expect(nextState).toMatchSnapshot();
    });

    it('should update state on recipient value change', () => {
      const nextState = reducer(undefined, A.changeRecipient('some new value'));
      expect(nextState).toMatchSnapshot();
    });

    it('should update sending flag on send routine action', () => {
      let nextState = reducer({sending: false}, A.send.request());
      expect(nextState.sending).toEqual(true);

      nextState = reducer({sending: true}, A.send.success());
      expect(nextState.sending).toEqual(false);

      nextState = reducer({sending: true}, A.send.failure());
      expect(nextState.sending).toEqual(false);
    });
  });
});
