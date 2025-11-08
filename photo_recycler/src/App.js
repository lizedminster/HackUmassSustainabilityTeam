import './App.css';
import React from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          RecycleTime
        </p>
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

export default App;
