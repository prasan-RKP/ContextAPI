import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search } from 'lucide-react'
import MyNote from '../mods/MyNote'
import { NoteListCONTXT } from '../store/NoteList-store'
import NoteSkeleton from './NoteSkeleton.jsx'   // ⬅ import your skeleton

const MyNotes = ({
    updateNote,
    editingNote,
    searchQuery,
    setSearchQuery,
    setEditingNote
}) => {

    const { notes, loading } = useContext(NoteListCONTXT);

    console.log("notes", notes);

    return (
        <div>
            <motion.div
                key="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Your Notes</h2>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none w-64"
                        />
                    </div>
                </div>

                {/* ⭐ LOADING SKELETON HERE */}
                {loading ? (
                    <NoteSkeleton />
                ) : notes?.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-gray-500"
                    >
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No notes found. Create your first note!</p>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note, i) => (
                            <MyNote
                                key={note?.uid}
                                note={note}
                                i={i}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default MyNotes;
