import express, { Request, Response } from "express";
import {
  getAllComments,
  addComment,
  editComment,
  deleteComment,
} from "../controllers/comments";

const router = express.Router();

router.get("/comments", async (req: Request, res: Response) => {
  try {
    const comments = await getAllComments();
    res.json(comments); // Send comments as JSON response
  } catch (err) {
    res.status(500).send("Error fetching comments");
  }
});

router.post("/comments/add", async (req, res) => {
  console.log(req.body);
  const { text, image } = req.body;

  if (!text || !image) {
    return res.status(400).send("Please provide text and image");
  }

  try {
    await addComment(text, image);
    return res.status(201).send("Comment added successfully");
  } catch (err) {
    console.error("Error adding comment:", err);
    return res.status(500).send("Error adding comment");
  }
});

router.put("/comments/:id/edit", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, image } = req.body;

  if (!text || !image) {
    return res.status(400).send("Please provide text and image");
  }

  try {
    await editComment(parseInt(id), text, image);
    return res.status(200).send("Comment edited successfully");
  } catch (err) {
    console.error("Error editing comment:", err);
    return res.status(500).send("Error editing comment");
  }
});

router.delete("/comments/:id/delete", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteComment(parseInt(id));
    return res.status(200).send("Comment deleted successfully");
  } catch (err) {
    console.error("Error deleting comment:", err);
    return res.status(500).send("Error deleting comment");
  }
});

export default router;
