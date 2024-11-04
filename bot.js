import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import "dotenv/config.js";
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

const getRates = async () => {
    const result = await axios({
      method: "GET",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      headers: { "X-CMC_PRO_API_KEY": process.env.API_KEY },
    });
    return result.data.data
}

bot.launch();