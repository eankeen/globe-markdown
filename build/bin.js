"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const main_1 = require("./main");
const readmeFile = process.argv[2] || 'README.md';
main_1.main(readmeFile)
    .then(async (text) => {
    try {
        await fs_1.default.promises.writeFile(readmeFile, text);
    }
    catch (err) {
        console.error(`error writing to readmefile '${readmeFile}'`);
        console.error(err);
        process.exitCode = 1;
    }
})
    .catch((err) => {
    console.error(err);
});
