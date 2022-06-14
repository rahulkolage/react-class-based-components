import { Component } from "react";

class ErrorBoundary extends Component {
  // it implements componentDidCatch

  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>;
    }
    return this.props.children;
    // using this we can wrap ErrorBoundary around components
  }
}

export default ErrorBoundary;
