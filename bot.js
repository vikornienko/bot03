import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import "dotenv/config.js";
import axios from "axios";
import schedule from "node-schedule";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    await ctx.reply(
        "Привет! Я бот, который по команде /getinfo покажет тебе курсы ТОП-10 криптовалют с сайта coinmarketcap"
    )
});

bot.command('getinfo', async (ctx) => {
    await ctx.reply(
        "Запрашиваю информацию с сайта!"
    );
    const ratesArray = await getRates();
    const rates = ratesArray.filter((res, index) => index < 3).map(
        item => {
            const percent =
              item.quote.USD.percent_change_1h > 0
                ? `Рост на ${item.quote.USD.percent_change_1h.toFixed(2)}%`
                : `Понижение на ${item.quote.USD.percent_change_1h.toFixed(2)}`;
            return `${item.symbol} |\$${item.quote.USD.price.toFixed(2)} | ${percent}`
        }
    )
    ctx.reply(rates.join('\n'));
    console.log(ratesArray);
})

bot.command("timerset", async (ctx) => {
    ctx.replyWithHTML("Отправьте время напоминания в формате\n <b>ДД.ММ.ГГГГ ЧЧ:ММ:СС</b>");
});

bot.on(message("text"), async (ctx) => {
    const dateInput = ctx.update.message.text;
    const date = parseDate(dateInput);
    if (date) {
        schedule.scheduleJob(date, () => {
            ctx.reply("Отправьте команду /getinfo");
        });
        await ctx.reply(`Напоминание установлено на ${date}`);
    } else {
        await ctx.reply("Неправильный формат времени. Пожалуйста, используйте формат ДД.ММ.ГГГГ ЧЧ:ММ:СС");
    } 
});
const parseDate = (dateStr) => {
    const [day, month, year, hour, minute, second] = dateStr.split(/[\s.:]/).map(Number);
    const date = new Date(year, month - 1, day, hour, minute, second);
    return isNaN(date.getTime()) ? null : date;
};

const getRates = async () => {
    const result = await axios({
      method: "GET",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      headers: { "X-CMC_PRO_API_KEY": process.env.API_KEY },
    });
    return result.data.data
};



bot.launch();