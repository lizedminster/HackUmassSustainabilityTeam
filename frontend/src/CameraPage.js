import React from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';


function CameraPage() {
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
          <CameraCapture />
        </div>
      </header>
    </div>
  );
}

export default CameraPage;
