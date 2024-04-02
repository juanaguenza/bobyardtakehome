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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.deleteComment = exports.addComment = exports.getAllComments = void 0;
const elephantSQL_1 = require("../../config/elephantSQL");
function getAllComments() {
    return __awaiter(this, void 0, void 0, function* () {
        // get comments from database
        const query = "SELECT * FROM Comments";
        const response = yield elephantSQL_1.client.query(query);
        return response.rows;
    });
}
exports.getAllComments = getAllComments;
function addComment(text, image) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("adding comment");
        // add comment to database
        const query = "INSERT INTO Comments (Author, Text, Date, Likes, Image) VALUES ('Admin', $1, NOW(), 0, $2)";
        const values = [text, image];
        try {
            yield elephantSQL_1.client.query(query, values);
        }
        catch (err) {
            console.error("Error adding comment: ", err);
            throw err;
        }
    });
}
exports.addComment = addComment;
function deleteComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // delete comment from database
        const query = "DELETE FROM Comments WHERE ID = $1";
        const values = [id];
        try {
            yield elephantSQL_1.client.query(query, values);
        }
        catch (err) {
            console.error("Error deleting comment: ", err);
            throw err;
        }
    });
}
exports.deleteComment = deleteComment;
function editComment(id, text, image) {
    return __awaiter(this, void 0, void 0, function* () {
        // edit comment in database
        const query = "UPDATE Comments SET Text = $1, Image = $2 WHERE ID = $3";
        const values = [text, image, id];
        try {
            yield elephantSQL_1.client.query(query, values);
        }
        catch (err) {
            console.error("Error editing comment: ", err);
            throw err;
        }
    });
}
exports.editComment = editComment;
