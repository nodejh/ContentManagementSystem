import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(' this.props: ', this.props);
    console.log(' this.props.CONTEXT: ', this.context);
    return (
      <h1>pos123123t</h1>
    );
  }
}


export default App;
