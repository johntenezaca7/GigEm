import React from 'react';

export default class Developers extends React.Component {

  render() {
    return (
      <div className="border p-1 m-3 w-100">
          <div className="row">
            <div className="col col-1">
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/Developers/DylanMcBurnett.jpg" alt="Dyland McBurnett" width="150px" height="150px" className="rounded-circle" /><br />
              <div>
                Dylan McBurnett
              </div>
              <div>
                <a href="https://www.linkedin.com/in/dylan-mcburnett/">
                  <img src="../../Assets/tools/LinkedIn.svg" width="20px" alt="LinkedIn" className="m-1"/>
                </a>
                <a href="https://github.com/dylanash">
                  <img src="../../Assets/tools/github.svg" width="20px" alt="Github" className="m-1" />
                </a>
              </div>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/Developers/JohnTenezaca.jpg" alt="John Tenezaca" width="150px" height="150px" className="rounded-circle" /><br />
              <div>
                John Tenezaca
              </div>
              <div>
                <a href="https://www.linkedin.com/in/jtenez/">
                  <img src="../../Assets/tools/LinkedIn.svg" width="20px" alt="LinkedIn" className="m-1" />
                </a>
                <a href="https://github.com/johntenezaca7">
                  <img src="../../Assets/tools/github.svg" width="20px" alt="Github" className="m-1" />
                </a>
              </div>
            </div>
            <div className="col col-md-auto mx-auto text-center small">
              <img src="../../Assets/Developers/TommyYork.jpg" alt="Tommy York" width="150px" height="150px" className="rounded-circle" /><br />
              <div>
                Tommy York
              </div>
              <div>
                <a href="https://www.linkedin.com/in/tommyyork/">
                  <img src="../../Assets/tools/LinkedIn.svg" width="20px" alt="LinkedIn" className="m-1" />
                </a>
                <a href="https://github.com/tommyyork">
                  <img src="../../Assets/tools/github.svg" width="20px" alt="Github" className="m-1" />
                </a>
              </div>
            </div>
            <div className="col col-1">
            </div>
          </div>
        </div>
    )
  }
}