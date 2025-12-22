import { Edit3, Save, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import EditNote from './EditNote'

const MyNote = ({ note, i, updateNote }) => {

  const [editingNote, setEditingNote] = useState(null);


  return (
    <motion.div
      key={note?._id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden"
    >

      <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

      <div className="p-6">
        {editingNote === note?.uid ? (
          <EditNote
            note={note}
            setEditingNote={setEditingNote}
          />
        ) : (
          <>
            <h3 className="font-semibold text-lg mb-2">{note?.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3">{note?.content}</p>

            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">

              {/* EDIT BUTTON */}
              <button
                onClick={() => setEditingNote(note?.uid)}
                className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1 text-sm hover:cursor-pointer"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => updateNote(note.uid)}
                className="flex-1 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center gap-1 text-sm hover:cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>

            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default MyNote
