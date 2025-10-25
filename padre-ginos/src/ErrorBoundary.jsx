import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  // react calls it when getting errors from child components
  static getDerivedStateFromError() {
    // this return object is merged with component internal state
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
    // for analytics, logging systems
  }

  // component lifecycle methods => useEffect()
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
