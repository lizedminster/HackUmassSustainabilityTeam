import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Take a Picture of the Item</h2>

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
          <button onClick={capture}>Take Picture</button>
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
