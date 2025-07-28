import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';
import '../../styles/EmojiPickerPopup.css'

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="emoji-picker-wrapper">
      <div className="picker-toggle" onClick={() => setIsOpen(true)}>
        <div className="icon-preview">
          {icon ? (
            <img src={icon} alt="Icon" className="emoji-img" />
          ) : (
            <LuImage className="emoji-placeholder" />
          )}
        </div>
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {isOpen && (
        <div className="emoji-popup">
          <button
            className="emoji-close"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || '')}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
