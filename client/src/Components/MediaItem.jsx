import React from 'react';
import { connect } from 'react-redux';
import { removeProperty, fetchProperties } from '../actions/index';


class mediaItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick(e, itemid) {
    e.preventDefault();
    this.props.deleteItem(itemid);
  }

  componentWillReceiveProps() {}

  render() {
    return(
      <div className='container m-3'>
        <iframe 
          width="auto" 
          height="auto" 
          src={`${this.props.item.linkUrl}`}
          frameborder="0" 
          gesture="media" 
          title={this.props.item.description}
          allow="encrypted-media" 
          allowfullscreen>
        </iframe>
        <div className="small">{this.props.item.description}</div>
        <form>
          <input type="submit" value="Remove item" onClick={(e) => this.handleClick(e, this.props.item.id)} />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (itemid) => {
      dispatch(removeProperty(itemid))
      .then(() => dispatch(fetchProperties()))
    }
  }
}

export default connect(null, mapDispatchToProps)(mediaItem);