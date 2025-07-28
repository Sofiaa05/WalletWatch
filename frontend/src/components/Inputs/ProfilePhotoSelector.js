import { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import '../../styles/ProfilePhotoSelector.css'; // Make sure to import the CSS

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleIncomeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="profile-photo-wrapper">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleIncomeChange}
        className="hidden-input"
      />

      {!image ? (
        <div className="upload-placeholder">
          <LuUser className="user-icon" />
          <button type="button" className="upload-button" onClick={onChooseFile}>
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="image-preview">
          <img src={previewUrl} alt="Profile" className="preview-image" />
          <button type="button" className="remove-button" onClick={handleRemoveImage}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
