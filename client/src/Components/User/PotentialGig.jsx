import React from 'react';
import Modal from 'react-modal';
import ProgressComponent from './ProgressComponent';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent } from '../../actions/index';
import ShowcaseInfo from '../ShowDescription';
import Payment from '../Payment';

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
            modalIsOpen: false,
            pitchValue: '',
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
        this.setState({modalIsOpen: false,
            changed: false,
            usercommitment: this.props.attendance.filter((x) => x.ShowcaseId === this.props.gig.id)[0] ? 
                    this.props.attendance.filter((x) => x.ShowcaseId === this.props.gig.id)[0].commitValue : 0
        })
    }

    componentWillReceiveProps() {
      if (!this.state.changed) this.setState({
        usercommitted : this.props.usercommitted,
        usercommitment: this.props.attendance.filter((x) => x.ShowcaseId === this.props.gig.id)[0] ? 
        this.props.attendance.filter((x) => x.ShowcaseId === this.props.gig.id)[0].commitValue : 0})
    }

    renderCommitmentForm(){
        if (!this.state.usercommitted) { 
            return(
                <form>
                    <input id="commits" 
                        type="number"
                        defaultValue={this.state.value}
                        onChange={(e) => {
                            this.setState({pitchValue: e.target.value})
                        }} />
                    {this.renderButton('uncommitted')}
                </form>    
            )
        } else {
            return(
                <div> 
                    <div>
                        {`User commitment: $ ${this.state.usercommitment ? this.state.usercommitment : 0}`}
                    </div>
                    <div>
                        {this.renderButton('committed')}
                    </div>
                </div>
            )
        }
    };

    renderButton(status) {
        if (status !== 'committed') {
            return (<div className="m-1">
                        <button type="submit" 
                            key={this.props.gig.id}
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                                this.handleSubmit(e)} }>
                            Commit
                        </button>
                    </div>
            )
        } else {
            return (<div className="m-1">
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={(e) => {
                                this.handleSubmit(e)} }>
                            Uncommit
                        </button>
                    </div>)
        }
    };

    
    handleSubmit(e) {
        if (this.state.usercommitted) {
            this.uncommitButton(e, this.props.info.id, this.props.gig.id, 0)
        } else {
            this.commitButton(e, this.props.info.id, this.props.gig.id, this.state.formvalue)
        }
    }

    commitButton(e, user, gig, amount) {
        this.props.onCommitClick(user, gig, amount)
        this.setState({usercommitment: amount, usercommitted: true, changed: true})
        // this.forceUpdate();
    }

    uncommitButton(e, user, gig) {
        this.props.onUncommitClick(user, gig)
        this.setState({usercommitment: 0, usercommitted: false, changed: true})
    }
    
    render() {
        //console.log('potential gig this.state: ', this.state);
        console.log('potential gig props: ', this.props);
        if (this.props.users.length > 0) {
            // let percent = ((this.props.gig.commits / this.props.gig.min_commits)*100);
            let percent = () => { 
                let showAttendance = (this.props.attendance).filter((x) => x.ShowcaseId === this.props.gig.id)
                if (showAttendance.length > 0) {
                  let showMoney = showAttendance.map(x => x.commitValue)
                  if (showMoney.length > 0) {
                    let sumAttendance = showMoney.reduce((a,b) => {
                        a = a || 0;
                        b = b || 0;
                        return a + b;
                        });
                    if (sumAttendance > 0) {
                        // need minimum value to have show .. minCommits
                        let percentage = (sumAttendance/this.props.gig.minCommits)*100;
                        if (percentage >= 100) {
                            // trigger action to mark show as isCommitted
                            // return percentage;
                        }
                        return percentage;
                    } 
                    }
                }
            }
            console.log("PERCENT FILTERED BY GIG: ", percent())
            return (
                <div className="container border p-3 m-1 small">
                    <div className="potential-gig-wrapper">
                        <div className="potential-gig-band-name">
                            <Link to={`/bandprofile/${this.props.gig.id}`}>
                                {/* <h5>{this.props.users.filter((x) => x.id = this.props.gig.id)[0].name}</h5> */}
                                <h6>Promoter:</h6>
                                <h5>{this.props.users.filter((x) => x.id === this.props.gig.UserId)[0].name}</h5>
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
                        </div>
                        <div className="text-success potential-gig-commit-number"> 
                          {this.state.commits} of {this.props.gig.min_commits} commits!
                        </div>
                        <div className="potential-gig-progress-bar">
                          <ProgressComponent percent={percent()} />
                        </div>
                        <div className="potential-gig-money-commit-value">
                        </div>
                        <div className="potential-gig-commit-button">

                                <div className={`commit-value-form`}>
                                  {this.renderCommitmentForm()}
                                  <Payment pitchValue={this.state.pitchValue}/>
                                </div>

                        </div>
                    </div>
            </div> )
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
    return {
      onCommitClick: (user, gig, amount) => {
        dispatch(commitToEvent(user, gig, amount))
      },
      onUncommitClick: (user, gig) => {
        dispatch(uncommitFromEvent(user, gig))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PotentialGig);