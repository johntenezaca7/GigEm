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

    onChange(event){
        // console.log(event.target.value)
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

    componentDidMount(){
        // console.log('connecting to db')s

        database.ref(`messages/`).on('value', (snapshot) => {
            const currentMessages = snapshot.val();

            if(currentMessages !== null){
                this.setState({
                    logs: currentMessages})
            }
        })
    }

    
    render(){
       
         const lastName = this.props.user.name.split(' ')[1]
        //  const par = Object.values(this.state.logs);

        //  console.log('logs', this.state.logs)
         const renderLogs = () => {
                return this.state.logs.map( (blob, ix) => {
                        // console.log('testing', blob)
                  return(<div key={ix}> {blob.username}: {blob.text} <br/> </div>)
                    // return 'ey'

                })
            }
            
        
        return(
                 <div className="container">
                    <div>
                        { this.state.logs[0] ?
                        <div>New User</div> :
                        renderLogs()
                        }
                    </div>
              
            
                    <form onSubmit={this.onSubmit}>
                             <input type="text" className="message-input" placeholder="Type message..." value={this.state.input} onChange={this.onChange}/>
                             <button type="submit" className="message-submit">Send</button>
                    </form>
               
                          
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