import { useReducer, useEffect, createContext } from "react";

export const NoteListCONTXT = createContext({
    notes: [],
    loading: false,
    addNote: () => { },
    deleteNote: () => { },
    editNote: () => { }
})

// noteReducer

const noteReducer = (curNotes, action) => {

    switch (action.type) {
        case "ADD_NOTE":
            return [action.payload.note, ...curNotes];

        case "DEL_NOTE":
            return curNotes.filter(note => note?.uid !== action.payload.uid);

        case "EDIT_NOTE":
            return curNotes.map((note) =>
                note?.uid === action.payload.uid ?
                    { ...note, content: action.payload.content } : note
            )

         case "INIL_NOTE":
            return action.payload.notes  
    }
}