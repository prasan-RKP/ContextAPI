import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Sparkles } from 'lucide-react';
import CreateNote from './docs/CreateNote.jsx';
import MyNotes from './docs/MyNotes.jsx';
import NotesProvider from './store/NoteList-store.jsx';
// import NotesList from './NotesList.jsx'; // <-- Make sure you have this component

const NoteApp = () => {
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
    <NotesProvider>
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
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${view === item
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
              </motion.div>
            )}

            {/* Notes View */}
            {view === 'notes' && (
              <MyNotes
                editingNote={editingNote} updateNote={updateNote} setEditingNote={setEditingNote} filteredNotes={filteredNotes} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            )}

            {/* Add Note View */}
            {view === 'add' && (
              <CreateNote newNote={newNote} setNewNote={setNewNote} addNote={addNote} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </NotesProvider>
  );
};

export default NoteApp;
