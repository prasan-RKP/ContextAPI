import express from "express";
import Note from "../../model/note.modal.js";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Hello route is working perfectly");
});

router.post("/create", async (req, res) => {
  const { uid, title, content } = req.body;

  try {
    // 1. Validate required fields
    if (!uid || !title || !content) {
      return res.status(400).json({ message: "Please fill all credentials" });
    }

    // 2. Check if a note with same UID already exists
    const existing = await Note.findOne({ uid });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Note already exists with this UID" });
    }

    // 3. Create new note
    const newNote = new Note({
      uid,
      title,
      content,
    });

    await newNote.save();

    // 4. Return success response
    return res.status(201).json({
      message: "Note created successfully",
      note: {
        _id: newNote._id,
        uid: newNote.uid,
        title: newNote.title,
        content: newNote.content,
      },
    });
  } catch (error) {
    console.error("Create Note error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/allNote", async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json({ notes });
  } catch (error) {
    console.log("Error in Fetching Notes", error);
    return res.status(500).json({ message: "Internal Server Error (notes)" });
  }
});


export default router;
