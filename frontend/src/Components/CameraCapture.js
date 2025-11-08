import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaCamera } from "react-icons/fa";
import ConfirmPhoto from './ConfirmPhoto';
import ReactDOM from 'react-dom/client';

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const uploadImage = async () => {
    if (!image) return;
  
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }), // base64 string
      });
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const openPopup = () => {
    const popup = window.open(
      '', // empty URL = open a blank popup
      'confirmPhoto', // name (can be reused)
      'width=400,height=400,left=200,top=200' // window features
    );
    const rootEl = popup.document.createElement('div');
    popup.document.body.appendChild(rootEl);

    const root = ReactDOM.createRoot(rootEl);
    root.render(<ConfirmPhoto popupWindow={popup} image={image}/>);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Take a Picture of the Item</h3>

      {!image ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'environment', // use back camera on mobile
            }}
            style={{ width: 300 }}
          />
          <br />
          <div>
            <button onClick={capture}><FaCamera /></button>
          </div>
        </>
      ) : (
        <>
          <img src={image} alt="captured" style={{ width: 300 }} />
          <br />
          <button onClick={openPopup}>Open Popup</button>
          <button onClick={uploadImage}>Send to Python</button>
          <button onClick={() => setImage(null)}>Retake</button>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
