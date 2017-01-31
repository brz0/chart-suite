import React from 'react';

// Svg
import ScreenOne from './screenshot.png';
import ScreenTwo from './screenshot.png';
import ScreenThree from './screenshot.png';
import ScreenFour from './screenshot.png';

class Screenshots extends React.Component {

  render() {
    return (
      <div className="screenshotRoot"><a name="screenshots" className="screenshotAnchor"></a>
        <div className="screen screenOne">
          <img src={ScreenOne} alt="Chart Suite Screenshot" className="screenImage" />
        </div>
        <div className="screen">
          <img src={ScreenTwo} alt="Chart Suite Screenshot" className="screenImage" />
        </div>
        <div className="screen screenThree">
          <img src={ScreenThree} alt="Chart Suite Screenshot" className="screenImage" />
        </div>
        <div className="screen">
          <img src={ScreenFour} alt="Chart Suite Screenshot" className="screenImage" />
        </div>
      </div>
    );
  }
}

export default Screenshots;
