import React from 'react';
// import BandPitch from './BandPitch';

export default class BandNavTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            UpcomingActive: '',
            FinalizeActive: '',
            PotentialActive: '',
            PitchActive: ''
        });

        if (this.props.tab === "upcoming") this.setState({UpcomingActive: 'active'});
        if (this.props.tab === "finalize") this.setState({FinalizeActive: 'active'});
        if (this.props.tab === "potential") this.setState({PotentialActive: 'active'});
        if (this.props.tab === "pitch") this.setState({PitchActive: 'active'});
        
    }

    render() {

    return(    
    <div className="container">
        <ul className="nav nav-pills  justify-content-md-center">
            <li className="nav-item">
                <a className={"nav-link " + this.state.UpcomingActive} href="/band/upcoming">Upcoming Shows</a>
            </li>
            <li className="nav-item">
                <a className={"nav-link " + this.state.FinalizeActive}  href="/band/finalize">Gigs to Finalize</a>
            </li>
            <li className="nav-item">
                <a className={"nav-link " + this.state.PotentialActive}  href="/band/potential">Potential Gigs</a>
            </li>
            <li className="nav-item">
                <a className={"nav-link " + this.state.PitchActive}  href="/band/pitch">Pitch a Gig</a>
            </li>
        </ul>
    </div>
    );
}}