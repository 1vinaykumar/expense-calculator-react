import { Typography } from "@material-ui/core";
import React, { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h4" align="center">
          Something Went Wrong
        </Typography>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
