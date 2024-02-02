"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ContactModel.ts
const mongoose_1 = require("mongoose");
const wordModel = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("contacts", wordModel);
