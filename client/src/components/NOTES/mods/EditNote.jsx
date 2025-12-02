import { Loader, Save, X } from 'lucide-react'
import React, { useContext, useRef } from 'react'
import { NoteListCONTXT } from '../store/NoteList-store';

const EditNote = ({ note, setEditingNote }) => {

    const { loading, editNote } = useContext(NoteListCONTXT);
    const newTitleElem = useRef('');
    const newContentElem = useRef('');


    const handleOnSave = (e) => {
        e.preventDefault();

        let newTitle = newTitleElem.current.value;
        let newContent = newContentElem.current.value;

        let content = { newTitle, newContent };
        editNote(note?.uid, content);

        newTitleElem.current.value = "";
        newContentElem.current.value = "";
        setEditingNote(null);

    }

    return (
        <div>
            <form onSubmit={(e) => handleOnSave(e)}>
                <div className="space-y-3">
                    <input
                        ref={newTitleElem}
                        type="text"
                        placeholder='Add new Title..'
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
                    />
                    <textarea
                        ref={newContentElem}
                        placeholder='Add new Content..'
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none resize-none h-24"
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2 hover:cursor-pointer rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center gap-1">
                            {loading ? (
                                <>
                                    <Loader className='h-5 w-5 animate-spin' />
                                </>
                            ) : (<>
                                <Save className="w-4 h-4" /> Save
                            </>
                            )}
                        </button>
                        <button onClick={() => setEditingNote(null)} className="flex-1 hover:cursor-pointer py-2 rounded-lg bg-white/10 flex items-center justify-center gap-1">
                            <X className="w-4 h-4" /> Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditNote
