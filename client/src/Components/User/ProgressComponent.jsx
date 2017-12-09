import React from 'react';
import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';


export default class ProgressComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


    render() {
      let containerStyle = {
        width: '100',
      };        
      return (
        <div style={containerStyle}>
          <Line percent={this.props.percent} strokeWidth="1" strokeColor={`#0ea534`} />
        </div>
      );
  }
}