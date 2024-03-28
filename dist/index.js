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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const webhookClient = new discord_js_1.WebhookClient({ url: process.env.WEBHOOK_URL });
const embed = new discord_js_1.EmbedBuilder()
    .setTitle("Some Title")
    .setColor(0x00ffff)
    .setImage("https://i.imgur.com/AfFp7pu.png");
const send = webhookClient.send({
    content: "Webhook test",
    username: "some-username",
    avatarURL: "https://i.imgur.com/AfFp7pu.png",
    embeds: [embed],
});
let messageId = "";
send
    .then((response) => __awaiter(void 0, void 0, void 0, function* () {
    messageId = response.id;
    const message = yield webhookClient.fetchMessage(messageId);
    console.log(message.embeds[0].image);
}))
    .catch((error) => console.log(error));
console.log(messageId);
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
// // Define the webhook URL
// const webhookUrl = process.env.WEBHOOK_URL_HERE!;
// // Data to be sent in the POST request
// const data = {
//   content: "Hello, this is a webhook message!",
//   username: "Amer Bot",
//   avatar: 'https://i.imgur.com/8J7X0lU.png',
//   embeds: [
//     {
//       image: {
//         url: `https://i.imgur.com/8J7X0lU.png`
//       }
//     }
//   ]
// };
// // Send the POST request
// axios
//   .post(`${webhookUrl}?wait=true`, data)
//   .then((response: any) => {
//     console.log("Webhook POST request successful!");
//     console.log(response.data);
//   })
//   .catch((error: any) => {
//     console.error("Error:", error);
//   });
