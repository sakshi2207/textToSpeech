"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processText = void 0;
const child_process_1 = require("child_process");
const processText = (text) => {
    const command = `python ./src/python/speechToText.py "${text}" `;
    const result = (0, child_process_1.execSync)(command, { encoding: 'utf-8' });
    return "./test.wav";
};
exports.processText = processText;
