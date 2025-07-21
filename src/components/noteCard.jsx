import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef, useMemo } from 'react';
import './noteCard.css';
import NoteModal from './noteModal.jsx';

const NoteCard = ({notes, DeleteCard, updateNote})=> {


    const [editId, setEditId] = useState(null)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedText, setEditedText] = useState("")
    const inputRef = useRef(null)
    const wrapperRef = useRef(null)
    const [selectedNoteModal, setSelectedNoteModal] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);

    useEffect(()=>{
        if(editId !== null && inputRef.current)
        {
            inputRef.current.focus()
        }
       },[editId]) 

    function startEditing(note){
        setEditId(note._id)
        setEditedTitle(note.title)
        setEditedText(note.content)

       
    }

    async function saveEdit(){
        // e.preventDefault()
        if(!editId) return;

        try{
            await updateNote(editId, editedTitle, editedText);
            setEditId(null);
        }

        catch(error){
             console.error("failed to load", error);
        }
        
        
    }

    function wrapperBlur(e){
        if(!wrapperRef.current.contains(e.relatedTarget))
        {
            saveEdit()
        }
    }

    
  
    

    const sortedNotes = useMemo(() => {
      return [...notes].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA;
    });}, [notes]);



    const expandNoteModal = (note) => {
            setSelectedNoteModal(note);
            setDisplayModal(true);
    };

    const closeModal = () => {
            setSelectedNoteModal(null);
            setDisplayModal(false);
    };
    // notes && notes.length? const Note = notes[0] : console.error("Array is empty");
    if(!notes.length)
    {
        return(
            <p className='initialmsg'>lets get Started with Divyansh notes, currently no notes found</p>
        )
    }
    
    console.log(notes)
    return(  
        <div className='parentOfCard'>
            {
                sortedNotes.map((currentnote)=>(
                    <div key={currentnote._id} className="cardData">
  
                    {(currentnote._id === editId?(  
                        <>
                        <div
                        tabIndex={-1}
                        ref={wrapperRef}
                        onBlur={wrapperBlur}>
                        <input type="text" 
                        className='input-like-h3'
                         ref={inputRef}
                         value={editedTitle}
                         onChange={(e)=>setEditedTitle(e.target.value)}
                        //  onBlur={saveEdit}
                         />

                         <textarea value={editedText}
                           className='textarea-like-p'
                         onChange={(e)=>setEditedText(e.target.value)}
                        //  onBlur={saveEdit}
                        //  onSubmit={()=>saveEdit}
                         />
                        </div>
                        </>
                    ):(<>
                    <h3 className='displaynote' onClick={()=>startEditing(currentnote)}>{currentnote.title}</h3>
                    <p className='displaynote' onClick={()=>startEditing(currentnote)}>{currentnote.content}</p>
                    </>))}
                      {console.log("Date value:", currentnote.date)}
                      <p>{new Date(currentnote.updatedAt).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true
                                                                            })}</p>                     
                     <div className="Cardbtn">
                      <button onClick={(e)=>DeleteCard(currentnote._id)}>delete</button>
                      <button onClick={()=> expandNoteModal(currentnote)}><FontAwesomeIcon icon="fa-solid fa-up-right-and-down-left-from-center" /></button>

                     </div>
                    </div>
                    
                ))
            }

    {displayModal && selectedNoteModal && (
                  <NoteModal currentnote={selectedNoteModal} closeModal={closeModal}/>)}        
    {/* {notes.map((currentnote)=>(
           
    <h3 onClick={console.log("hello")}>{currentnote.title}</h3>
    <p onClick={console.log("hello")}>{currentnote.text}</p>
    <p>{currentnote.date}</p>
     */}
    
    
    
{/* ))} */}
</div>)
}

export default NoteCard;