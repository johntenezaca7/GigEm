import React from 'react';

class BandProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
              <div className="row">
                <div className="col-1">
                </div>
                <div className="col-2">
                  <h1 className="display-4">Bandname Profile</h1>
                    <div className="container mx-auto">
                      <img src="./Assets/bandLogo.svg" width="200px" height="200px" alt="Bandname"/>
                    </div>
                    Brooklyn, NY
                    <h5>Upcoming Gig'em Shows</h5>
                    Upcoming Shows Component Placeholder
                    <h5>Potential Gigs</h5>
                    Potential Gigs Placeholder
                </div>
                <div className="col-1">
                </div>
                <div className="col-6">
                <p>Lorem ipsum dolor sit amet, eam ex saperet labores inimicus, nam stet natum dissentiet at. Odio sumo qui id, nam lorem hendrerit ei, ut dicam commodo vis. No pri natum apeirian consulatu, sed at solet option efficiantur. An ius oporteat oportere repudiandae. Te mea inani honestatis.</p>
                <p>Qui ea eripuit disputationi, ex mea eius liber. Ea wisi detracto molestiae pri, cu erat tempor sadipscing sit. Usu minim liber sadipscing in. Nisl prompta inimicus sea ea. Eam autem meliore delicatissimi ne, mea an consul electram laboramus. Ex quo aeterno electram principes.</p>
                <div className="container">
                  <h3>Video Placeholder</h3>
                  <img src="./Assets/videoPlayer.svg" align="center" width="300px" height="300px" alt="videoplayer" />
                </div>
                <div className="container">
                  <h3>Audio Placeholder</h3>
                  <img src="./Assets/videoPlayer.svg" align="center" width="300px" height="300px" alt="videoplayer" />
                </div>
                <div className="container">
                  <h3>Audio Placeholder</h3>
                  <img src="./Assets/videoPlayer.svg" align="center" width="300px" height="300px" alt="videoplayer" />
                </div>
                </div>
              </div>
            </div>
        )
    }
}

export default BandProfile;