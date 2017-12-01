import React from 'react';
import Footer from './Footer';
import Developers from './Developers';

export default class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentWillMount() {
    //   fetchEvents();
    // }

    fetchEvents(e) {
      e.preventDefault();
      this.props.onFetchClick();
    }

    render() {

      return (
        <div className="container w-100">
          <div className="row"> 
            <div className="col col-md-auto mx-auto text-center">
              <img src="../../Assets/tools/React.svg" width="50%" alt="Gigem Logo"/>
              <h1 className="display-1">Gig'em</h1>
              <div className="m-3">
                <a href="/auth/google"><button className="btn btn-info my-2 my-sm-0" type="submit">Login</button></a>
              </div>
              <div className="m-2">
               A Kickstarter-like for local music shows, allowing users to commit to potential local show and 
               bands to propose events across the country. This project was designed as a thesis project at Hack Reactor NYC
              by the following developers:
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col self-align-center">
            <Developers />
          </div>
        </div>
        <div>
        <h1 className="display-4 text-center m-2">Tools</h1>
        </div>
        <div className="row">

          <div className="col self-align-center">
            <Footer />
          </div>
        </div>
      </div>
      )
    }
}
