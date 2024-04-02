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
exports.initDB = exports.client = void 0;
const pg_1 = __importDefault(require("pg"));
var conString = "postgres://kukqqena:SlakV-y0b1HRtMh5VwOzHJY9C0EIKZhP@bubble.db.elephantsql.com/kukqqena"; // add to .env later if time
var client = new pg_1.default.Client(conString);
exports.client = client;
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    client.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
    });
});
exports.initDB = initDB;
