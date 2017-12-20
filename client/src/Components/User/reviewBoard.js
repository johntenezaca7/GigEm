import React, { Component } from 'react';
import firebase from '../../fireB/firebase';
import { connect } from 'react-redux'; 
import * as actions from '../../actions';

// import Logs from './messageLogs';

const database = firebase.database();

class Board extends Component {
    constructor(props){
        super(props);

        this.state={
            input:'',
            logs: [],
            messages: [],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        
    }

    componentDidMount(){
        database.ref(`messages/`).on('value', (snapshot) => {
            const currentMessages = snapshot.val();

            if(currentMessages !== null){
                this.setState({
                    logs: currentMessages})
            }
        });
        
    }


    onChange(event){
    
        this.setState({
            input: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();
        const firstName = this.props.user.name.split(' ')[0]
        const lastName = this.props.user.name.split(' ')[1]
        
        const mesid = this.state.logs.length || 1
        const nextMessage = {
            id: mesid,
            username: firstName,
            text: this.state.input, 
            createdAt: Date.now()
        }
        const ref = `messages/${nextMessage.id}` || `messages/1` 

        database.ref(ref).set(nextMessage);
   
        this.setState({
            input:''
        });    

    }


    
    render(){
       
         const lastName = this.props.user.name.split(' ')[1]
    
         const renderLogs = () => {
                return this.state.logs.map( (blob, ix) => {
                  return( <div key={ix} className="each-text"> <h5>{blob.username}: <strong>{blob.text}</strong></h5>  </div>)    
            })
        }
        return(
                 <div>
                    <div className="chat-box">
                    <div className="chat-container">
                           
                        <div className="chat-content">
                            { this.state.logs[0] ?
                            <div>New User</div> :
                            renderLogs()
                            }
                            <div id="new-texts" ref={() => {
                                                    const elm = document.getElementById('new-texts');
                                                    elm.scrollIntoView(true);
                                                           }}>
                            </div>
                        </div>
                       
                    </div>
                    
                    <div className="mes-input">
                        <form onSubmit={this.onSubmit}>
                                <input type="text" className="message-input" placeholder="Type message..." value={this.state.input} onChange={this.onChange}/>
                                <button type="submit" className="message-submit">Send</button>
                        </form>
                    </div>
                </div>   
                 </div>
             )
    }
}

function mapStateToProps(state){
    return {
        mes: state.chat,
        user: state.info
    }
}

export default  connect(mapStateToProps, actions)(Board);