import React from 'react';
import {shallow} from 'enzyme';

import WaitButton from '../../../src/client/components/buttons/wait-button';

describe('WaitButton', () => {
  it('should render children if not busy props', () => {
    const waitButton = shallow(<WaitButton busy={false} children="Run" busyChildren="Processing..."/>);

    expect(waitButton.props()).toMatchSnapshot();
  });

  it('should render busyChildren if busy props', () => {
    const waitButton = shallow(<WaitButton busy children="Run" busyChildren="Processing..."/>);

    expect(waitButton.props()).toMatchSnapshot();
  });

  it('should render children if busy props and no busyChildren props specified', () => {
    const waitButton = shallow(<WaitButton busy children="Show me even busy=true"/>);

    expect(waitButton.props()).toMatchSnapshot();
  });

  it('should call onClick function on click if not busy', () => {
    const fn = jest.fn();
    const waitButton = shallow(<WaitButton children="Click me" onClick={fn}/>);
    waitButton.simulate('click');

    expect(fn).toBeCalledTimes(1);
  });

  it('should not call onClick function on click if busy', () => {
    const fn = jest.fn();
    const waitButton = shallow(<WaitButton busy children="Click me" onClick={fn}/>);
    waitButton.simulate('click');

    expect(fn).toBeCalledTimes(0);
  });
});
