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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const comments_1 = __importDefault(require("./src/api/routes/comments"));
const elephantSQL_1 = require("./src/config/elephantSQL");
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, elephantSQL_1.initDB)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: "10mb" })); // Increase the limit as needed
    app.use("", comments_1.default);
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
});
startServer();
