"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: { type: String },
    voiceKey: { type: String },
    password: { type: String },
    email: { type: String },
    emails: [{ type: String }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
