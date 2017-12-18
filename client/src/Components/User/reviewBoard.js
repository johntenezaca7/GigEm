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
        // console.log('TRYINGG',event.target.value)
        this.state.logs.push(this.state.input)
        this.props.newUserHere(this.state.input)
        this.setState({
            input:''
        })
    }

    renderLogs(){
        return this.state.logs.map( (mes, ix) => {
            return (<div> <span>{mes}</span> <br /> </div>)
        })
    }

    render(){
        if(!this.props.mes){
            const message = ''
        }
        // const message = this.props.mes
        // console.log('reducer', this.props.mes)
        return(
            <div className="container">
                {this.renderLogs()}
             <form action="" onSubmit={this.onSubmit}>
                 <input id="m"  value={this.state.input} onChange={this.onChange}/><button>Send</button>
             </form>
            </div>
             )
    }
}

function mapStateToProps(state){
    return {
        mes: state.chat
    }
}

export default  connect(mapStateToProps, actions)(Board);