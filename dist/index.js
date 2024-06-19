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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
require("dotenv/config");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const webhookClient = new discord_js_1.WebhookClient({ url: process.env.WEBHOOK_URL });
const app = (0, express_1.default)();
// Multer configuration for handling file uploads
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/upload", upload.single("image"), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        // Read the image file
        const imageData = node_fs_1.default.readFileSync((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        console.log((_b = req.file) === null || _b === void 0 ? void 0 : _b.path.replace(`\/`, "/"));
        // Create a message attachment with the image
        const attachment = new discord_js_1.AttachmentBuilder((_c = req.file) === null || _c === void 0 ? void 0 : _c.path.replace(/\\/g, "/"));
        const send = yield webhookClient.send({
            content: "Webhook test",
            username: "some-username",
            avatarURL: "https://i.imgur.com/AfFp7pu.png",
            files: [attachment],
        });
        console.log(send);
        res.send(send);
    });
});
// app.post("/upload", upload.single("image"), async function (req, res) {
//   // Read the image file
//   const imageData = fs.readFileSync(req.file?.path!);
//   const base64Image = Buffer.from(imageData).toString('base64');
//   fs.unlinkSync(req.file?.path!)
//   // Remove header from base64 string
//   const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
//   // Save DataUri to Database
//   // Send back the image data as data URI
//   res.status(200).send({ imageDataURI: `data:image/png;base64,${base64Data}` });
// });
// Endpoint to serve the image
app.get('/image/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = node_path_1.default.join(__dirname, 'uploads', imageName);
    res.sendFile(imagePath);
});
app.listen(3000);
