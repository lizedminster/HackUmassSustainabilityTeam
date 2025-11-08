import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FaCamera } from "react-icons/fa";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
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
          <button onClick={() => setImage(null)}>Retake</button>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
