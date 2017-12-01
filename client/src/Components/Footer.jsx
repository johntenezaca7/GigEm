import React from 'react';

export default class Footer extends React.Component {
  // constructor(props) {
  //   super();
  //   this.state = {};
  // }

  render() {
    return(
      // <nav class="navbar fixed-bottom bg-white">
        <div className="border p-1 m-3 w-100">
          <div className="row">
            <div className="col col-1">
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/node_js_logo.svg" alt="node.js" width="75px" height="75px" className="p-2" /><br />
              Node.js
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/express.svg" alt="express" width="75px" height="75px" className="p-2"/><br />
              Express
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/react.svg" alt="React JS" width="75px" height="75px" className="p-2"/><br />
              React JS
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/react-router.svg" alt="react-router" width="75px" height="75px" className="p-2"/><br />
              React Router
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/redux.svg" alt="Redux" width="75px" height="75px" className="p-2"/><br />
              Redux
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/sequelize.svg" alt="sequelize" width="75px" height="75px" className="p-2"/><br />
              Sequelize
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/webpack.svg" alt="webpack" width="75px" height="75px" className="p-2"/><br />
              Webpack
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/tools/aws.svg" alt="AWS" width="75px" height="75px" className="p-2"/><br />
              AWS 
            </div>
            <div className="col col-1">
            </div>
          </div>
        </div>
      // </nav>
    )
  }
}