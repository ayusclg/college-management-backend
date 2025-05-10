"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnect = void 0;
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.configDotenv)();
const DbConnect = async () => {
    try {
        const mongoInstance = await mongoose_1.default.connect(`${process.env.MONGODB_URI}`);
    }
    catch (error) {
        console.log("erro in connecting Database", error);
        process.exit(1);
    }
};
exports.DbConnect = DbConnect;
