"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_1 = require("../controllers/comments");
const router = express_1.default.Router();
router.get("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, comments_1.getAllComments)();
        res.json(comments); // Send comments as JSON response
    }
    catch (err) {
        res.status(500).send("Error fetching comments");
    }
}));
router.post("/comments/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { text, image } = req.body;
    if (!text || !image) {
        return res.status(400).send("Please provide text and image");
    }
    try {
        yield (0, comments_1.addComment)(text, image);
        return res.status(201).send("Comment added successfully");
    }
    catch (err) {
        console.error("Error adding comment:", err);
        return res.status(500).send("Error adding comment");
    }
}));
router.put("/comments/:id/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text, image } = req.body;
    if (!text || !image) {
        return res.status(400).send("Please provide text and image");
    }
    try {
        yield (0, comments_1.editComment)(parseInt(id), text, image);
        return res.status(200).send("Comment edited successfully");
    }
    catch (err) {
        console.error("Error editing comment:", err);
        return res.status(500).send("Error editing comment");
    }
}));
router.delete("/comments/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, comments_1.deleteComment)(parseInt(id));
        return res.status(200).send("Comment deleted successfully");
    }
    catch (err) {
        console.error("Error deleting comment:", err);
        return res.status(500).send("Error deleting comment");
    }
}));
exports.default = router;
