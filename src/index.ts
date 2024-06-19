import express from "express";
import multer from "multer";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { AttachmentBuilder, EmbedBuilder, WebhookClient } from "discord.js";

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL! });

const app = express();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async function (req, res) {
  // Read the image file
  const imageData = fs.readFileSync(req.file?.path!);
  console.log(req.file?.path!.replace(`\/`, "/"));

  // Create a message attachment with the image
  const attachment = new AttachmentBuilder(
    req.file?.path!.replace(/\\/g, "/")!
  );

  const send = await webhookClient.send({
    content: "Webhook test",
    username: "some-username",
    avatarURL: "https://i.imgur.com/AfFp7pu.png",
    files: [attachment],
  });

  console.log(send);

  res.send(send);
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
  const imagePath = path.join(__dirname, 'uploads', imageName);
  res.sendFile(imagePath);
});

app.listen(3000);
