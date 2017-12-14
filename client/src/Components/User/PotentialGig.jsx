import React from 'react';
import Modal from 'react-modal';
import ProgressComponent from './ProgressComponent';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent, fetchAllUsers } from '../../actions/index';
import ShowcaseInfo from '../ShowDescription';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


class PotentialGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: this.props.gig.commits,
            usercommitted: this.props.usercommitted,
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    renderButton() {
        // console.log('PotentialGig.jsx this.props in renderButton() method')
        // console.log(this.props); 
        if (!this.state.usercommitted) {
            return (<div><button className="btn btn-info my-2 my-sm-0" onClick={(e) => this.commitButton(e, this.props.info.id, this.props.gig.id)}>Commit</button></div>)
        } else if (this.state.usercommitted) {
            return (<div><button className="btn btn-info my-2 my-sm-0" onClick={(e) => this.uncommitButton(e, this.props.info.id, this.props.gig.id)}>Uncommit</button></div>)
        }
    }

    commitButton(e, user, gig) {
        // e.preventDefault();
        this.props.onCommitClick(user, gig)
        this.setState({commits: this.state.commits + 1})
        this.setState({usercommitted: !this.state.usercommitted});
    }

    uncommitButton(e, user, gig) {
        this.props.onUncommitClick(user, gig)
        this.setState({commits: this.state.commits - 1});
        this.setState({usercommitted: !this.state.usercommitted});
    }

    render() {
                if (this.props.users.length > 0) {
            let percent = ((this.state.commits / this.props.gig.min_commits)*100);
            return (
                <div className="container border p-3 m-1 small">
                    <div className="potential-gig-wrapper">
                        <div className="potential-gig-band-name">
                            <Link to={`/bandprofile/${this.props.gig.id}`}>
                                <h5>{this.props.users.filter((x) => x.id = this.props.gig.id)[0].name}</h5>
                            </Link>
                            <div>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                               >
                            <button onClick={this.closeModal}>close</button>
                          
                           <ShowcaseInfo showId={this.props.gig.id} />
                            </Modal>
                          </div>
                        </div>
                        <h4 className="potential-gig-event-name" onClick={this.openModal}>
                        
                              {this.props.gig.name}
                       
                        </h4>
                        <div className="potential-gig-daterange">
                            {this.props.gig.city ? this.props.gig.city : 'No city specified.'}<br />
                            Daterange placeholder<br />
                            {/* {this.props.gig.start_date} to<br />
                            {this.props.gig.end_date} */}
                        </div>
                        <div className="text-success potential-gig-commit-number"> 
                          {this.state.commits} of {this.props.gig.min_commits} commits!
                        </div>
                        <div className="potential-gig-progress-bar">
                          <ProgressComponent percent={percent} />
                        </div>
                        <div className="potential-gig-commit-button">
                            {this.renderButton()}
                        </div>
                    </div>
                </div>)
        } else {
            return(<div></div>)
        }
    } 
}

function mapStateToProps({ auth, attendance, users, info }){
    return { 
      attendance: attendance,
      auth: auth, 
      users: users,
      info: info
    }
  }

const mapDispatchToProps = dispatch => {
    //console.log('mapdispatch to props: ', dispatch);
    return {
        init: (e) => {
            dispatch(fetchAllUsers())
        },
      onCommitClick: (user, gig) => {
        //console.log('onFetchClick id: ', id)
        dispatch(commitToEvent(user, gig))
      },
      onUncommitClick: (user, gig) => {
        dispatch(uncommitFromEvent(user, gig))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PotentialGig);