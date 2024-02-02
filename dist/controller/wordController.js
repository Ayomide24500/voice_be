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
exports.getOneUser = exports.getAllUser = exports.sendEmails = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = require("../utils/email");
const wordModel_1 = __importDefault(require("../model/wordModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, emails, voiceKey } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield wordModel_1.default.create({
            email,
            password: hashed,
            emails,
            voiceKey,
        });
        return res.status(201).json({
            msg: "User created successfully",
            status: 201,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.createUser = createUser;
const sendEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        console.log(req.params);
        console.log(userID);
        const { voiceKey } = req.body;
        const user = yield wordModel_1.default.findById(userID);
        console.log(user);
        if (user && voiceKey === user.voiceKey) {
            for (const i of user.emails) {
                console.log(i);
                (0, email_1.sendEmail)(i);
            }
            return res.status(200).json({
                msg: "User created successfully",
                status: 201,
                data: user,
            });
        }
        else {
            return res.status(404).json({
                msg: "User not found",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.sendEmails = sendEmails;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield wordModel_1.default.find();
        return res.status(200).json({
            msg: "User created successfully",
            status: 200,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.getAllUser = getAllUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield wordModel_1.default.findOne({ email });
        if (user) {
            return res.status(200).json({
                msg: "User created successfully",
                status: 200,
                data: user,
            });
        }
        else {
            return res.status(404).json({
                msg: "Error getting user",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating user",
            status: 404,
        });
    }
});
exports.getOneUser = getOneUser;
