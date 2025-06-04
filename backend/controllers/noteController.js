const Note = require("../models/Note")

// exports.createNote = async (req, res) => {
//     try {
//         const note = await Note.create({
//             title: req.body.title,
//             content: req.body.content,
//             user: req.user.id,
//         });
//         res.status(200).json(note);
//     } catch (error) {
//         res.status(500).json({message: "error creating note"});

//     }
    
// };


exports.createNote = async (req, res) => {
    try {
        console.log("🟡 Incoming POST /notes request");
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);

        if (!req.user || !req.user.id) {
            console.warn("⚠️ Missing req.user, rejecting request");
            return res.status(401).json({ message: "Unauthorized: no user" });
        }

        if (!req.body.content) {
            console.warn("⚠️ Missing title or content in request body");
            return res.status(400).json({ message: "Title and content are required" });
        }


        const note = await Note.create({
            title: req.body.title?req.body.title:" ",
            content: req.body.content,
            user: req.user.id,
        });

        console.log("✅ Note created:", note);
        res.status(200).json(note);
    } catch (error) {
        console.error("❌ Error in createNote:", error);
        res.status(500).json({ message: "Error creating note", error: error.message });
    }
};


exports.getNotes = async(req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: "error while fetchng notes"});
    }

};

exports.updateNote = async (req, res) =>{
    try {
        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id},
             req.body,
             {new: true})
        if(!note) return res.status(404).json({message: "note not found"});
        res.status(200).json(note);    
    } catch (error) {
       res.status(500).json({message:"error updating the note"});
    }
};

exports.deleteNote = async (req,res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id, user: req.user.id})
        if(!note) return res.status(404).json({message: "note not found"});
        res.status(200).json({message: "note deleted"})
    } catch (error) {
        res.status(500).json({message: "error while deleting the note"});
    }
};