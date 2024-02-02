"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wordModel = new mongoose_1.Schema({
    email: {
        type: String,
    },
    word: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("words", wordModel);
