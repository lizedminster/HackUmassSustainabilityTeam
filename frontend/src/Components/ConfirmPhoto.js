import React from "react";

const ConfirmPhoto = ({ popupWindow, image }) => {
  const handleClose = () => {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
  };

  const uploadRecycle = async () => {  
    try {
      const response = await fetch('http://localhost:8000/recycle_log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "user_id": 8,
            "material_type": "plastic"
          }),
      });
      const data = await response.json();
      console.log('Server response:', data);
      if (popupWindow && !popupWindow.closed) {
        popupWindow.close();
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Type</h2>
      <img src={image} />
      <div>
        <button
          onClick={uploadRecycle}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Save
        </button>
      </div>
      <div>
        <button
          onClick={handleClose}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Retake
        </button>
      </div>
    </div>
  );
};

export default ConfirmPhoto;
