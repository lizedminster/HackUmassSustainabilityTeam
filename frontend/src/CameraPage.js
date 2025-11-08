import React from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';


function CameraPage({user_id}) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          RecycleTime
        </h1>
        <div>
          <TextBox />
        </div>
        <div>
          <CameraCapture user_id={user_id} />
        </div>
      </header>
    </div>
  );
}

export default CameraPage;
