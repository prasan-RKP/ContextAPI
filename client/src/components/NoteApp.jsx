import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Trash2, Edit3, Save, X, Sparkles, Search } from 'lucide-react';

export default function NoteApp() {
  const [view, setView] = useState('home');
  const [notes, setNotes] = useState([
    { id: 1, title: 'Welcome Note', content: 'This is your first note. Start organizing your thoughts!', color: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'Ideas', content: 'Capture your brilliant ideas here before they slip away.', color: 'from-cyan-500 to-blue-500' },
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const colors = [
    'from-purple-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
  ];

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setNotes([...notes, { id: Date.now(), ...newNote, color: randomColor }]);
      setNewNote({ title: '', content: '' });
      setView('notes');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const updateNote = () => {
    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? editingNote : n));
      setEditingNote(null);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-transparent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-900/20 via-transparent to-transparent"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NotesApp
            </span>
          </motion.div>

          <div className="flex items-center gap-2">
            {['home', 'notes', 'add'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(item)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  view === item
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {item === 'home' ? 'Home' : item === 'notes' ? 'See Notes' : 'Add Note'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Home View */}
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
              >
                <FileText className="w-12 h-12" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                Capture Your
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Brilliant Ideas
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
              >
                A modern, beautiful notes app to organize your thoughts, ideas, and everything in between.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('add')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Create Note
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('notes')}
                  className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur font-semibold"
                >
                  View Notes ({notes.length})
                </motion.button>
              </motion.div>

              {/* Feature cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-20">
                {[
                  { icon: Plus, title: 'Create', desc: 'Add new notes instantly' },
                  { icon: Edit3, title: 'Edit', desc: 'Update anytime you want' },
                  { icon: Trash2, title: 'Delete', desc: 'Remove what you dont need' },
                ].map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 mx-auto">
                      <f.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Notes View */}
          {view === 'notes' && (
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
          )}

          {/* Add Note View */}
          {view === 'add' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8">Create New Note</h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Enter note title..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Content</label>
                    <textarea
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Write your note content..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition-colors resize-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addNote}
                    disabled={!newNote.title.trim() || !newNote.content.trim()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" /> Create Note
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}