import React from 'react';
import { connect } from 'react-redux';
import { removeProperty, fetchProperties } from '../../actions/index';


class mediaItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick(e, itemid) {
    e.preventDefault();
    this.props.deleteItem(itemid);
  }

  renderRemoveButton() {
    if (this.props.ownUserProfile && this.props.linkUrl) {
      return(        <form>
        <input type="submit" value="Remove item" className="btn btn-info btn-sm" onClick={(e) => this.handleClick(e, this.props.item.id)} />
      </form>)
    } else {
      return (<div></div>)
    }
  }

  render() {
    return(
      <div className="container p-1 m-1">
        <div className=''>
          <iframe 
            width="100%" 
            height="100%" 
            src={`${this.props.item.linkUrl}`}
            frameborder="0" 
            gesture="media" 
            title={this.props.item.description}
            allow="encrypted-media" 
            allowfullscreen>
          </iframe>
        </div>
        <div>
          <div className="small">{this.props.item.description}</div>
            {this.renderRemoveButton()}
        </div>
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