import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Modal from 'react-modal';
import { FaCamera } from 'react-icons/fa';
import './cameraCaptureStyles.css';


const CameraCapture = ({ user_id }) => {
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [material, setMaterial] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const webcamRef = useRef(null);

  const materialOptions = [
    'plastic',
    'paper',
    'glass',
    'metal',
    'cardboard',
    'biodegradable',
    'unknown'
  ];


  const detectMaterial = async (imageSrc) => {
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

      return (
        result.material_type ||
        result.material ||
        result.detected_material ||
        'Unknown'
      );
    } catch (error) {
      console.error('Error during detection:', error);
      return 'Error detecting material';
    }
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setImage(imageSrc);
    setModalIsOpen(true); // open modal first so user can see loading
    setUploading(true);   // show spinner/loading text immediately
    setShowDropdown(false); // reset dropdown state

    const detectedMaterial = await detectMaterial(imageSrc);
    setMaterial(detectedMaterial);

    setUploading(false);  // hide loading after detection
  };

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

  const handleClose = () => {
    setModalIsOpen(false);
    setMaterial(null);
    setImage(null);
    setShowDropdown(false);
  };

  const handleRetake = () => {
    setMaterial(null);
    setImage(null);
    setModalIsOpen(false);
    setShowDropdown(false);
  };

  const DropDownMaterials = () => {
    const handleMaterialChange = (selectedMaterial) => {
      setMaterial(selectedMaterial);
      setShowDropdown(false); // Close dropdown after selection
    };

    return (
      <div className="dropdown-container">
        <div className="dropdown">
          <button 
            className="dropdown-toggle capture-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Change Material
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {materialOptions.map((option) => (
                <button
                  key={option}
                  className="dropdown-item"
                  onClick={() => handleMaterialChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='test'>
      <h3>Photograph Your Trash!</h3>

      {/* Webcam view */}
      {!image && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
            style={{ width: 700, borderRadius: '10px'}}
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
        <h2 className="center-stuff">Material Detection</h2>

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

        {uploading && <p className='center-stuff'>Analyzing material...</p>}

        {!uploading && material && (
          <div className="center-stuff">
            <h3>Detection Result:</h3> 
            <p className="material-result">{material}</p>
            
            <DropDownMaterials />
  
            <div>
              {material === "plastic" ? (
                <p>Depends! Plastic shopping bags and other thin plastics like cling wrap cannot be placed in recycling bins because they cause major litter problems and clog sorting machinery. Many local grocery stores provide plastic bag recycling. Many plastic containers can be recycled.</p>
              ) : material === "paper" ? (
                <p>Recycle! Paper can be recycled in your household paper recycling. Store receipts can also be recycled. Carbon and thermal paper are not recyclable.</p>
              ) : material === "glass" ? (
                <p>Mostly Recycle! Most glass food and beverage bottles and jars smaller than 2 gallons in size may be included in your mixed container recycling bin. All BROKEN glass should go in the TRASH.</p>
              ) : material === "metal" ? (
                <p>Not Recyclable! Scrap metal is accepted at the Transfer Station. Disposal fees apply.</p>
              ) : material === "cardboard" ? (
                <p>Recycle! Cardboard can be recycled in your household paper recycling. Make sure there is no food residue such as pizza grease or Chinese take-out containers.</p>
              ) : material === "biodegradable" ? (
                <p>Compost! Biodegradable waste CANNOT be recycled, but it can be composted at home in a compost bin or at municipal collection programs.</p>
              ) : (
                <p>Take another photo.</p>
              )}
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
              <button onClick={handleRetake} className="retake-btn">
                Retake
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CameraCapture;