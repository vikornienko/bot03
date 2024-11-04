import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import "dotenv/config";
import axios from "axios";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    await ctx.reply(
        "Привет! Я бот, который по команде /getinfo покажет тебе курсы ТОП-10 криптовалют с сайта coinmarketcap"
    )
});

bot.command('getinfo', async (ctx) => {
    await ctx.reply(
        "Запрашиваю информацию с сайта!"
    )
})

bot.launch();