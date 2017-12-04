import React from 'react';
import Footer from './Footer';
import Developers from './Developers';

// import Particles from 'react-particles';

export default class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

      return (
        <div className="landingpage">
          <div className="container-fluid p-5 landingcontainer">
            <div className="row"> 
          
                    <div className="col mx-auto text-center m-5">
                          <img src="../../Assets/tools/aws.svg" width="100%" style={{maxWidth: '40%'}} className="img-fluid" alt="Gigem Logo"/>
                    </div>
                  </div>
          
                  <div className="row m-2">
                    <div className="col col-md-auto mx-auto text-center" id="branddiv">
                      <div className="m-5" style={{height: '20%'}}>
                        <a href="/auth/google" crossOrigin="true" ><button className="btn btn-info btn-lg align-middle" type="submit">Login</button></a>
                        <br/>
                        <br/>
                      </div>
                    </div>
                  </div>

                  <div className="row m-1">
                  </div>
          
                    <div className="row">
                        <div className="col col-md-auto mx-auto text-center m-5">
                          <a href="#description">
                            <svg className="arrows">
                              <path className="a1" d="M0 0 L30 32 L60 0"></path>
                              <path className="a2" d="M0 20 L30 52 L60 20"></path>
                              <path className="a3" d="M0 40 L30 72 L60 40"></path>
                            </svg>
                          </a>
                      </div>
                    </div>
          </div>

          <div className="container-fluid">

          <div className="row">
            {/* <div className="col col-2">
            </div> */}
            <div className="col mx-auto text-center">
              <div className="m-5">
                <a name="description">
                  A Kickstarter-like application for local music shows, allowing users to commit to potential local show and 
                  bands to propose events across the country. This project was designed as a thesis project at Hack Reactor NYC
                  by the following developers:
                </a>
              </div>
            </div>
            {/* <div className="col col-2">
            </div> */}
          </div>

          <div className="row">
            {/* <div className="col col-2">
            </div> */}
            <div className="col mx-auto">
              <Developers />
            </div>
            {/* <div className="col col-2">
            </div> */}
        </div>

        <div className="row">
          {/* <div className="col col-2">
          </div> */}
          <div className="col self-align-center">
            <h1 className="display-4 text-center m-2">
              Tools
            </h1>
          </div>
          {/* <div className="col col-2">
          </div> */}
        </div>

        <div className="row">
          {/* <div className="col col-2">
          </div> */}
          <div className="col self-align-center">
            <Footer />
          </div>
          {/* <div className="col col-2">
          </div> */}
        </div>
      </div>

    </div>
      )
    }
}
