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
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/convert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let text = req.query.text as string;
    // console.log("text",text);
    //   if(!text ) return res.status(500).send({error:"Text cannot be empty"});
    //   let inputs = processText(text)
    //   console.log("text",inputs);
    // const transformStream = new Transform({
    //   transform(chunk, encoding, callback) {
    //     callback(null, JSON.stringify(chunk));
    //   },
    // });
    // inputs.pipe(transformStream).pipe(res);
    const audioFilePath = './src/utils/test.wav';
    const audioStream = fs_1.default.createReadStream(audioFilePath);
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', 'attachment; filename="audio.wav"');
    res.set('Content-Type', 'application/json');
    audioStream.pipe(res);
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
