import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Plus } from 'lucide-react'
import { useContext } from 'react'
import { NoteListCONTXT } from '../store/NoteList-store'
import { useRef } from 'react'
import { toast } from 'sonner';
const CreateNote = ({ newNote, setNewNote }) => {

    const { addNote, loading } = useContext(NoteListCONTXT);

    const uidElem = useRef(null);
    const titleElem = useRef(null);
    const contentElem = useRef(null);


    const onFormSubmit = (e) => {
        e.preventDefault();

        let uid = uidElem.current.value;
        let title = titleElem.current.value;
        let content = contentElem.current.value;

        if (!uid) {
            toast.error("Fill your Uid");
            return;
        }

        if (!title) {
            toast.error("Fill your title");
            return;
        }

        if (!content) {
            toast.error("Fill your content");
            return;
        }

        let note = { uid, title, content };
        addNote(note);

        console.log("Form submitted ✅->", note);

        uidElem.current.value = "";
        titleElem.current.value = "";
        contentElem.current.value = "";
    }


    return (
        <div>
            <form onSubmit={(e) => onFormSubmit(e)}>
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
                                <label className="block text-sm text-gray-400 mb-2">UiD</label>
                                <input
                                    type="text"
                                    ref={uidElem}
                                    placeholder="Enter note uid"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Title</label>
                                <input
                                    type="text"
                                    ref={titleElem}
                                    placeholder="Enter note title..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Content</label>
                                <textarea
                                    ref={contentElem}
                                    placeholder="Write your note content..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none transition-colors resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (<Loader2 className='h-5 w-5 animate-spin' />

                                ) : (<><Plus className="w-5 h-5" /> Create Note </>)}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </form>
        </div>
    )
}

export default CreateNote
