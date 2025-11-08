import './App.css';
import React, { useState } from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';
import TabsContainer from './TabsContainer';
import AuthPage from './Auth';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <AuthPage setToken={setToken} />
  }

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
      < TabsContainer/>
    </div>
  );
}

export default App;
