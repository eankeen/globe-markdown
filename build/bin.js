"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const readmeFile = process.argv[1] || "README.md";
main_1.main(readmeFile).catch((err) => {
    console.error(err);
});
