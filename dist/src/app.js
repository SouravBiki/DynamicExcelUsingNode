"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const FileDownloadRoute_1 = require("../routes/FileDownloadRoute");
const app = express_1.default();
const port = 3000;
app.set('trust proxy', true);
app.use(body_parser_1.json());
app.use(FileDownloadRoute_1.FileDownloadRoute);
app.get('/', (req, res) => {
    res.send('OK');
});
app.get('/test', (req, res) => {
    res.send('ABC');
});
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map