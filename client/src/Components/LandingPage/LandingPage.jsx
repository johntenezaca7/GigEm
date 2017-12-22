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
                          <img src="../../Assets/giglogo.svg" width="80%" alt="Gigem Logo"/>
                    </div>
                  </div>
          
                  <div className="row">
                    <div className="col mx-auto text-center" id="branddiv">
                      <div className="" style={{height: '20%'}}>
                        <a href="/auth/google" crossOrigin="true" >
                        <button className="loginBtn loginBtn--google text-center" type="submit">Login with Google</button></a>
                        <br/>
                        <br/>
                      </div>  
                    </div>
                  </div>

                  <div className="row m-1">
                  </div>
          
                    <div className="row">
                        <div className="col mx-auto p-5">
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
            <div className="col mx-auto text-center">
              <div className="m-5">
              <h1 className="display-4 text-center m-2">About Gig'em</h1>

                <a name="description">
                  The hardest part of being an artists is getting your first gig. Gig'em is a platform that allows communities to support their local artists by crowdfunding their shows.
                  Artist can get the support they need and users can view up-coming events, support potential shows and explore the Gig'em community!
                </a>
              </div>
            </div>
        
          </div>

          <div className="row">
            {/* <div className="col col-2">
            </div> */}
            <div className="col mx-auto">
            <h1 className="display-4 text-center m-2">Development Team</h1>
              <Developers />
            </div>
          
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