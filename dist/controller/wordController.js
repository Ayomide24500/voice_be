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
exports.createWord = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_1 = require("../utils/email");
const wordModel_1 = __importDefault(require("../model/wordModel"));
const contactModel_1 = __importDefault(require("../model/contactModel"));
const createWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { word, contacts } = req.body;
        if (!Array.isArray(contacts)) {
            return res.status(400).json({
                msg: "Contacts should be an array",
            });
        }
        // Create a new word
        const createdWord = yield wordModel_1.default.create({ word });
        // Create contacts and associate them with the created word
        const createdContacts = yield contactModel_1.default.create(contacts.map((contact) => ({
            email: contact,
            wordId: createdWord._id,
        })));
        // Send a simple text email
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "ayomideadisa83@gmail.com",
                pass: "Ayomide1234",
            },
        });
        // Define the message
        const messageOptions = {
            from: "ayomideadisa83@gmail.com",
            to: `${contacts.join(",")}`,
            subject: "New Word Received",
            text: `You received the word: ${createdWord.word} - ID: ${createdWord._id}`,
        };
        try {
            // Send the simple text email
            const info = yield transporter.sendMail(messageOptions);
            console.log("Simple Email sent: ", info.response);
            // Send the customized email using verifiedEmail function
            yield (0, email_1.verifiedEmail)({
                _id: createdWord._id,
                email: contacts[0],
                userName: "User",
            });
            // Response to the client
            res.json({ success: true, message: "Emails sent successfully" });
        }
        catch (error) {
            console.error("Error sending email: ", error);
            res.status(404).json({ success: false, message: "Failed to send email" });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: "error creating word",
        });
    }
});
exports.createWord = createWord;
