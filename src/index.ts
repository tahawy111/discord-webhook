import express from "express";
import multer from "multer";
import "dotenv/config";
import fs from "node:fs";
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

  res.send("Hello World");
});

app.listen(3000);
