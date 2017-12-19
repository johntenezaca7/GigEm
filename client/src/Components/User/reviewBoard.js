import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../../actions';
import Logs from './messageLogs';


class Board extends Component {
    constructor(props){
        super(props);

        this.state={
            input:'',
            logs: []
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
       
        this.props.mes.push(this.state.input );
        this.props.newUserHere(this.props.mes)
        // {this.props.mes}
        this.setState({
            input:''
        })

    }

    
    render(){
       
        const name = this.props.user.name.split(' ')[0]
        const renderLogs = () => {
            return this.props.mes.map( (mes, ix) => {
                return (<div> {name}: {mes} <br/> </div>)
            })
        }
        
        return(
            <div className="container">
                <div class="chat">
              
                <div class="messages">
                    <div class="messages-content">
                    {renderLogs()}
                    </div>
                </div>
                <div class="message-box">
                   

                    <form onSubmit={this.onSubmit}>
                             <input type="text" className="message-input" placeholder="Type message..." value={this.state.input} onChange={this.onChange}/>
                             <button type="submit" class="message-submit">Send</button>
                    </form>
                </div>

                </div>
            <div class="bg"></div>
             
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