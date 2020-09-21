import React from 'react';
import { Transition } from 'react-transition-group'
import { TweenMax } from 'gsap';


const withTransition = ( props) => {
  // ...and returns another component...
    const startState = { autoAlpha: 0, y: -50 };
   console.log(props);

  return (
    <Transition
      unmountOnExit
      in={true}
      timeout={1000}
      onEnter={(node) => TweenMax.set(node, startState)}
      addEndListener={(node, done) => {
        TweenMax.from(node, 0.5, {
          autoAlpha: true ? 1 : 0,
          y: true ? 0 : 50,
          onComplete: done,
        });
      }}
      >
          {props.children}
    </Transition>
  );
}
export default withTransition;
