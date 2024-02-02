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
exports.verifiedEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH;
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URL);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
const url = "http://localhost:5173";
const verifiedEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "ayomideadisa83@gmail.com",
                clientSecret: GOOGLE_SECRET,
                clientId: GOOGLE_ID,
                refreshToken: GOOGLE_REFRESH,
                accessToken,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, "secretCode");
        const verificationLink = `${url}/${token}/sign-in`;
        const receivedWord = "ExampleWord";
        const userName = user.userName || "User";
        const emailTemplatePath = path_1.default.join(__dirname, "emailTemplate.ejs");
        const html = yield ejs_1.default.renderFile(emailTemplatePath, {
            userName,
            receivedWord,
            verificationLink,
        });
        const mailerOption = {
            from: "❤️⛑️🚑 <ayomideadisa83@gmailcom>",
            to: user.email,
            subject: "Account Verification",
            html,
        };
        yield transporter.sendMail(mailerOption);
    }
    catch (error) {
        console.error("Error sending email: ", error);
    }
});
exports.verifiedEmail = verifiedEmail;
// ... (other email functions)