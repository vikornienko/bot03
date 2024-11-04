import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import "dotenv/config";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
});

bot.launch();