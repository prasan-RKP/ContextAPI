import { Save, X } from 'lucide-react'
import React from 'react'

const EditNote = ({editingNote, setEditingNote, updateNote}) => {
    return (
        <div>
            <div className="space-y-3">
                <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
                />
                <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none resize-none h-24"
                />
                <div className="flex gap-2">
                    <button onClick={updateNote} className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center gap-1">
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button onClick={() => setEditingNote(null)} className="flex-1 py-2 rounded-lg bg-white/10 flex items-center justify-center gap-1">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditNote
