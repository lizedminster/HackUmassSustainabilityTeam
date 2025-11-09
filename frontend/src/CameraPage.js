import React from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';


function CameraPage({user_id}) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{marginBottom: '0px'}}>
          RecycleTime
        </h1>
        <div style={{paddingTop: '0px'}}>
          <CameraCapture user_id={user_id} />
        </div>
      </header>
    </div>
  );
}

export default CameraPage;
