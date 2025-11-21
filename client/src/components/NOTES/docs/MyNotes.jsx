import React from 'react'
import {motion} from 'framer-motion';
import { Edit3, FileText, Save, Search, Trash2, X } from 'lucide-react';

const MyNotes = ({filteredNotes, editingNote, searchQuery, setSearchQuery}) => {
    return (
        <div>
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

                    {filteredNotes.length === 0 ? (
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
                            {filteredNotes.map((note, i) => (
                                <motion.div
                                    key={note.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="group relative rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden"
                                >
                                    <div className={`h-2 bg-gradient-to-r ${note.color}`} />
                                    <div className="p-6">
                                        {editingNote?.id === note.id ? (
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
                                        ) : (
                                            <>
                                                <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                                                <p className="text-gray-400 text-sm line-clamp-3">{note.content}</p>
                                                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => setEditingNote(note)}
                                                        className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1 text-sm"
                                                    >
                                                        <Edit3 className="w-4 h-4" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteNote(note.id)}
                                                        className="flex-1 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center gap-1 text-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default MyNotes;
