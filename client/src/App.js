import React, { Component } from 'react';
import axios from 'axios';

///////////////////////////////
////// Component Imports //////
///////////////////////////////

import Navbar from './Components/Navbar'
import BandProfile from './Components/BandProfile';
import UserDashboard from './Components/UserDashboard';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.fetchDemo = this.fetchDemo.bind(this);
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
      <div>
          <Navbar />
          {/* <BandProfile /> */}
          <UserDashboard />
      </div>
    );
  }
}

export default App;
