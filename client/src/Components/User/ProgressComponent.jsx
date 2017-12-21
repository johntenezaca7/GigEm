import React from 'react';
import {
  Line
} from 'rc-progress';
import 'rc-progress/assets/index.css';


export default class ProgressComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    let containerStyle = {
      width: '100',
      color: '255, 159, 152'
    };
    return (
      <div style={containerStyle}>
          <Line percent={this.props.percent} strokeWidth="2" strokeColor={`#44c744`} />
        </div>
    );
  }
}