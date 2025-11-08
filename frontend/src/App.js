import './App.css';
import React from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';
import TabsContainer from './TabsContainer';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>
          RecycleTime
        </h1>
        <div>
          <TextBox />
        </div>
        <div>
          <CameraCapture />
        </div>
      </header> */}
      <TabsContainer />
    </div>
  );
}

export default App;
