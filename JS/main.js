document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
     // lyssna på 'Enter'-tryck i input-fältet
    document.querySelector('#noteInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNote();
            event.preventDefault(); 
        }
    });
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach((note, index) => {
        createNoteElement(note, index);
    });
}

function addNote() {
    const noteContent = document.querySelector('#noteInput').value;
    if (noteContent.trim() === '') return; 
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(noteContent);
    localStorage.setItem('notes', JSON.stringify(notes));
    createNoteElement(noteContent, notes.length - 1);
    document.querySelector('#noteInput').value = '';
}

function createNoteElement(content, index) {
    const notesContainer = document.querySelector('.notes .content');
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.textContent = content;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Ta bort';
    deleteBtn.onclick = function() { deleteNote(index); };
    noteElement.appendChild(deleteBtn);

    notesContainer.appendChild(noteElement);
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1); 
    localStorage.setItem('notes', JSON.stringify(notes)); // Uppdaterar localStorage
    document.querySelector('.notes .content').innerHTML = ''; // Rensar befintliga anteckningar från UI
    loadNotes(); 
}

document.addEventListener('DOMContentLoaded', () => {
   
    const editableText = document.querySelector('.editable-container .editable-text');

    // Ladda tidigare sparad rubrik från localStorage
    const savedHeading = localStorage.getItem('editableHeadingText');
    if (savedHeading) {
        editableText.textContent = savedHeading; // Uppdatera texten inuti <span>
    }

    
    document.querySelector('.editable-container').addEventListener('click', function() {
        editableText.setAttribute('contenteditable', 'true');
        editableText.focus(); 
    });

    
    editableText.addEventListener('blur', function() {
        localStorage.setItem('editableHeadingText', this.textContent); 
        this.removeAttribute('contenteditable'); 
    });
});