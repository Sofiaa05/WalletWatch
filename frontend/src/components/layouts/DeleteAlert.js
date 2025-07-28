import React from 'react'
import '../../styles/DeleteAlert.css'
const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
      <p className="alert-description">{content}</p>
      <div className="alert-action-buttons">
        <button
            type="button"
            className='add-btn'
            onClick={onDelete}
        >
            Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
