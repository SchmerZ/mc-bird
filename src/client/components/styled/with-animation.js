/**
 * Inspired by https://github.com/granmoe/styled-animate/blob/master/src/with-animation.js
 * Need extra control on props for Transition.
 * Fixed bugs related to timeout execution with i.e. '.25s' value in transition.
 */
import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

const Debug = styled.div`
  height: 40px;
  font-size: 24px;
  background-color: white;
  color: royalblue;
`;

export default (
  component,
  {animateIn, animateOut, animateSticky, animate, transition},
) => {
  // if more than one animate, throw exception
  if (
    (Boolean(animate) ^
      Boolean(animateIn) ^
      Boolean(animateOut) ^
      Boolean(animateSticky)) !==
    1
  ) {
    throw new Error(
      'Exactly one of the following options must be passed to animate: animate, animateIn, animateOut or animateSticky.',
    )
  }

  const styles = animate || animateIn || animateOut || animateSticky;
  const propertyName = Object.keys(styles)[0];
  const [defaultValue, enteredValue] = styles[propertyName];
  const defaultStyles = `${propertyName}: ${defaultValue}`;
  const enteredStyles = `${propertyName}: ${enteredValue}`;
  const enteringStyles = animateOut ? enteredStyles : '';

  const AnimatedComponent = styled(component)`
    transition: ${propertyName} ${transition};
    ${defaultStyles};
    ${({__state}) => __state === 'entered' && enteredStyles};
    ${({__state}) => __state === 'entering' && enteringStyles};
  `;

  const unmountOnExit = Boolean(animateIn || animateOut || animate);
  const [_, value, unit] = transition.match(/(\.?\d+)(m?s)/i);
  const timeout =
    unit.toLowerCase() === 's' ? value * 1000 : parseInt(value, 10);
  const exitTimeout = animate || animateOut || animateSticky ? timeout : 0;
  const enteredTimeout = animateIn ? timeout : 0;

  return ({
            in: inProp,
            children,
            debug,
            onEnter,
            onEntered,
            onEntering,
            onExit,
            onExited,
            onExiting,
            ...rest
          }) => (
    <Transition
      in={inProp}
      timeout={{
        enter: 0,
        entered: enteredTimeout,
        exit: exitTimeout,
        exited: 0,
      }}
      unmountOnExit={unmountOnExit}
      mountOnEnter={unmountOnExit}
      onEnter={onEnter}
      onEntered={onEntered}
      onEntering={onEntering}
      onExit={onExit}
      onExited={onExited}
      onExiting={onExiting}
    >
      {state =>
        debug ? (
          <div>
            <AnimatedComponent __state={state} {...rest}>
              {children}
            </AnimatedComponent>
            <Debug>State: {state}</Debug>
          </div>
        ) : (
          <AnimatedComponent __state={state} {...rest}>
            {children}
          </AnimatedComponent>
        )
      }
    </Transition>
  )
}
