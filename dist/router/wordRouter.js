"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wordController_1 = require("../controller/wordController");
const router = (0, express_1.Router)();
router.route("/create-word").post(wordController_1.createWord);
exports.default = router;
