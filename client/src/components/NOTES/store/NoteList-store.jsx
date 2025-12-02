import { useReducer, useEffect, createContext, useState } from "react";
import { axiosInstance } from "../../../lib/noteAxios.js"

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
            return curNotes.map(note =>
                note?.uid === action.payload.uid
                    ? { ...note, title: action.payload.newTitle, content: action.payload.newContent }
                    : note
            );

        case "INIL_NOTE":
            return action.payload.notes;

        default:
            return curNotes;
    }
};


// noteProvider initialized
const NotesProvider = ({ children }) => {
    const [notes, dispatchNote] = useReducer(noteReducer, []);

    const [loading, setLoading] = useState(false);


    // action for 'INIL_NOTE' 
    const fetchNotes = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/allNote");
            dispatchNote({
                type: "INIL_NOTE",
                payload: { notes: res.data.notes }
            })
        } catch (error) {
            console.error("Error fetching notes action -> INIL_NOTE :", error);
        }

        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    //  ------- Add Note -----------
    const addNote = async (data) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post("/create", data);
            dispatchNote({
                type: "ADD_NOTE",
                payload: { note: res.data.note }
            })
        } catch (error) {
            console.error("Error adding note -> 'ADD_NOTE':", error);
        }
        finally {
            setLoading(false);
        }
    }

    // Delete Note
    const deleteNote = async (uid) => {
        setLoading(true);
        try {
            const res = axiosInstance.delete(`/delete/${uid}`);
            dispatchNote({
                type: "DEL_NOTE",
                payload: { uid }
            })
        } catch (error) {
            console.log("Error delteing not 'DEL_NOTE'", error);
        }

        finally {
            setLoading(false);
        }
    }

    //Edit note
    const editNote = async (uid, data) => {
        setLoading(true);
        try {
            const res = axiosInstance.put(`/edit/${uid}`, {
                title: data.title,
                content: data.content
            })

            dispatchNote({
                type: "EDIT_NOTE",
                payload: {uid, newTitle: data.newTitle, newContent: data.newContent}
            })
            
        } catch (error) {
            console.error("Error editing note:", err);
        }
        finally{
        setLoading(false);
        }
    };


    return (
        <NoteListCONTXT.Provider
            value={{
                notes,
                loading,
                addNote,
                deleteNote,
                editNote
            }}
        >
            {children}
        </NoteListCONTXT.Provider>
    )
}

export default NotesProvider;