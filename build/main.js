"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remark_1 = __importDefault(require("remark"));
// import remarkStarchart from "remark-starchart";
const remark_license_1 = __importDefault(require("@fox-land/remark-license"));
const remark_title_1 = __importDefault(require("@fox-land/remark-title"));
async function main(readmePath) {
    let readmeFile;
    try {
        readmeFile = await fs_1.default.promises.readFile(readmePath, { encoding: "utf8" });
    }
    catch (err) {
        console.error(`Could not read readme file '${readmeFile}`);
        console.error(err);
    }
    remark_1.default().use(remark_title_1.default, { title: path_1.default.dirname(readmePath) }).use(remark_license_1.default, { spdxId: "Apache-2.0" }).process(readmeFile).then((vfile) => {
        console.info(vfile);
    }).catch((err) => {
        console.error(err);
    });
}
exports.main = main;
