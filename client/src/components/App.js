import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.fetchDemo() = this.fetchDemo.bind(this);
  }

  fetchDemo(){
    axios.get('/api/check')
      .then(res => {
        console.log(res.data)
      })
  }
  
  componentDidMount(){
    this.fetchDemo()
  }
  render() {
    return (
      <div >
          Hello from App
      </div>
    );
  }
}

export default App;
