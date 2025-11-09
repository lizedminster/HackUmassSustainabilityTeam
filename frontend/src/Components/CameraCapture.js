import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Modal from 'react-modal';
import { FaCamera } from 'react-icons/fa';
import './cameraCaptureStyles.css';

// Accessibility fix
Modal.setAppElement('#root');

const CameraCapture = ({ user_id }) => {
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [material, setMaterial] = useState(null);
  const [uploading, setUploading] = useState(false);
  const webcamRef = useRef(null);

  // ----------------------------
  // Detect material type
  // ----------------------------
  const detectMaterial = async (imageSrc) => {
    setUploading(true);
    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc }),
      });

      if (!response.ok) {
        throw new Error(`Detection failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Detection result:', result);

      // Accepts different backend response field names
      return (
        result.material_type ||
        result.material ||
        result.detected_material ||
        'Unknown'
      );
    } catch (error) {
      console.error('Error during detection:', error);
      return 'Error detecting material';
    } finally {
      setUploading(false);
    }
  };

  // ----------------------------
  // Capture & analyze photo
  // ----------------------------
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setImage(imageSrc);
    setUploading(true);

    // Detect before opening modal
    const detectedMaterial = await detectMaterial(imageSrc);
    setMaterial(detectedMaterial);

    setUploading(false);
    setModalIsOpen(true);
  };

  // ----------------------------
  // Save recycling log
  // ----------------------------
  const handleSave = async () => {
    if (!image || !material || !user_id) {
      alert('Missing data — cannot save.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/recycle_log/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          material_type: material, // ✅ consistent key
          image: image, // base64 image string
        }),
      });

      if (!response.ok) {
        throw new Error(`Save failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Save response:', data);
      if (!response.ok) {
        alert('Failed to save recycling log.');
      }
      handleClose();
      } catch (error) {
      console.error('Error saving image:', error);
      alert('Error saving image.');
    }
    
  };

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleClose = () => {
    setModalIsOpen(false);
    setMaterial(null);
    setImage(null);
  };

  const handleRetake = () => {
    setMaterial(null);
    setImage(null);
    setModalIsOpen(false);
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Photograph Your Trash!</h3>

      {/* Webcam view */}
      {!image && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
            style={{ width: 700, borderRadius: '10px' }}
          />
          <br />
          <button
            onClick={capture}
            className="capture-btn"
            disabled={uploading}
          >
            <FaCamera /> {uploading ? 'Processing...' : 'Capture'}
          </button>
        </>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Material Detection</h2>

        {image && (
          <img
            src={image}
            alt="Captured"
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '10px',
            }}
          />
        )}

        {uploading && <p>Analyzing material...</p>}

        {!uploading && material && (
          <div>
            <h3>Detection Result:</h3>
            <p className="material-result">{material}</p>

            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleRetake} className="retake-btn">
              Retake
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CameraCapture;
