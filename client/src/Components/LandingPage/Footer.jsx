import React from 'react';

export default class Footer extends React.Component {
  // constructor(props) {

  render() {
    return (
      <div className="border p-1 m-3 w-100" style={{ backgroundImage: '../../Assets/talkingheads-live.jpg' }}>
          <div className="row">
            <div className="col col-1">
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://nodejs.org/en/">
                <img src="../../Assets/tools/node_js_logo.svg" alt="node.js" width="75px" height="75px" className="p-2" /><br />
                Node.js
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://expressjs.com/">
                <img src="../../Assets/tools/express.svg" alt="express" width="75px" height="75px" className="p-2"/><br />
                Express
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://reactjs.org/">
                <img src="../../Assets/tools/react.svg" alt="React JS" width="75px" height="75px" className="p-2"/><br />
                React
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://github.com/ReactTraining/react-router">
                <img src="../../Assets/tools/react-router.svg" alt="react-router" width="75px" height="75px" className="p-2"/><br />
                React Router
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://redux.js.org/">
                <img src="../../Assets/tools/redux.svg" alt="Redux" width="75px" height="75px" className="p-2"/><br />
                Redux
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="http://docs.sequelizejs.com/">
                <img src="../../Assets/tools/sequelize.svg" alt="sequelize" width="75px" height="75px" className="p-2"/><br />
                Sequelize
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://webpack.js.org/">
                <img src="../../Assets/tools/webpack.svg" alt="webpack" width="75px" height="75px" className="p-2"/><br />
                Webpack
              </a>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <a href="https://aws.amazon.com/">
                <img src="../../Assets/tools/aws.svg" alt="AWS" width="75px" height="75px" className="p-2"/><br />
                AWS 
              </a>
            </div>
            <div className="col col-1">
            </div>
          </div>
        </div>
    )
  }
}