
import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose(); // Close the modal if the click is outside the modal content
      }
    };

    // Add when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    // Return function to be called when it unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div ref={modalContentRef} style={{
        backgroundColor: 'blue'  ,
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%', // Assuming you want to set the width to 100%
      }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default Modal;