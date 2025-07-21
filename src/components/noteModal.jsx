import { createPortal } from 'react-dom';
import "./noteModal.css";

function NoteModal({currentnote, closeModal}) {

    if(!currentnote) return null;

    return createPortal(
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal}>×</button>
                <h2>{currentnote.title}</h2>
                <p>{currentnote.content}</p>
                <div className="modal-date">
                    {new Date(currentnote.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default NoteModal;