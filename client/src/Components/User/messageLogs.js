import React, { Component } from 'react';
import { connect } from 'react-redux'; 


class Logs extends Component {
    constructor(props){
        super(props);
        
    }

    
    
    renderMessages(){
        return "hello"
    }
    
    render(){
        
        console.log('Logs', this.props.messages)
        return(
            <div>
               {this.renderMessages()} 
            </div>
        )
    }

}
function mapStateToProps(state){
    return {
        messages : state.chat
    }
}

export default connect(mapStateToProps)(Logs);