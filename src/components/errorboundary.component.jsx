import React from 'react';
;

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    //process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h2>An Unexpected error has occured</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
