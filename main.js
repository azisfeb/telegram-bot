const { Telegraf } = require("telegraf");
const { v4: uuidV4 } = require("uuid");
require("dotenv").config();
let factGenerator = require('./factGenerator');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    let message = `Please use /fact command to receive a new fact about animals.`
    ctx.reply(message);
})

bot.telegram.sendMessage(-616174783, "Push Message when server runing....")

bot.command("fact", async (ctx) => {
    try{
        ctx.reply(`Generating image, please wait...`);
        let imagePath = `./temp/${uuidV4()}.jpg`;
        await factGenerator.generateImage(imagePath);
        await ctx.replyWithPhoto({
            source: imagePath
        })
        factGenerator.deleteImage(imagePath);
    } catch(e) {
        console.error("error: ", e);
        ctx.reply('sending image error');
    }
})

bot.launch();