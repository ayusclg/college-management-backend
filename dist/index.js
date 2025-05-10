"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3000;
const host = "127.0.0.1";
(0, database_1.DbConnect)().then(() => {
    console.log("Connected To Database");
}).catch(() => {
    console.log("Error In Database Connection ");
});
app.get("/", (req, res) => {
    res.send("Hello This Is Typescript Backend");
});
app.listen(port, () => {
    console.log(`you are running on : http://${host}:${port}`);
});
