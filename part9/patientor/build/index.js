"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    console.log('ping pong');
    res.send('pong');
});
app.listen(3001, () => console.log('server is running'));
