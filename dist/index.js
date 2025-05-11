"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const student_1 = __importDefault(require("./routes/student"));
const app = (0, express_1.default)();
const port = 3000;
const host = "127.0.0.1";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
(0, database_1.DbConnect)().then((res) => {
    app.listen(port, () => {
        console.log(`you are running on : http://${host}:${port}`);
    });
}).catch((err) => {
    console.log("Error In Database Connection ");
});
app.get("/", (req, res) => {
    res.send("Hello This Is Typescript Backend");
});
app.use("/auth", student_1.default);
