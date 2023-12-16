import React, { Component } from 'react';

const withDataFetching = (url) => (WrappedComponent) => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: null,
    };

    async componentDidMount() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        this.setState({
          data,
          loading: false,
        });
      } catch (error) {
        this.setState({
          loading: false,
          error: 'Error fetching data',
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export default withDataFetching;
