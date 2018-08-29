import React from 'react';

import reducer from '../../src/client/quick-message/reducer';
import * as A from '../../src/client/quick-message/actions';

describe.only('Quick message form', () => {
  describe('Reducer', () => {
    it('should update state on recipient value change', () => {
      const nextState = reducer(undefined, A.changeRecipient('some new value'));
      expect(nextState).toMatchSnapshot();
    });
  });
});
