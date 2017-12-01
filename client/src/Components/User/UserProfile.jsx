import React from 'react';

class UserProfile extends React.Component {
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
                <div className="col-6">
                  <h1 className="display-4">User Profile</h1>
                    <div className="container mx-auto">
                      <img src="./Assets/userLogo.svg" width="200px" height="200px" alt="Bandname"/>
                    </div>
                    <h3>User Zip</h3>
                    <h3>Age: User Zip</h3>
                    Upcoming Shows Component Placeholder
                    <h3>Potential Gigs</h3>
                    Potential Gigs Placeholder
                </div>
              </div>
            </div>
        )
    }
}

export default UserProfile;