import telegramBot from 'node-telegram-bot-api';
import config from './config.js';
import { createPairing } from './pair.js';
import { sessionCount } from '../core/session.js';

const bot = new telegramBot(config.telegramToken, { polling: true });

const img = '../assets/bot.png';

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `CRAZY -TELE - XMD BOT 🤖\n\nWelcome to CRAZY BOT please don\'t abuse.\n\nCOMMAND LIST:\n/pair - for pair a number\n/runtime - runtime of the bot\n/disconnect - only for owner (crazy)`;
    bot.sendPhoto(chatId, img, { caption: welcomeMessage });
    });
    bot.onText(/\/pair/, async (msg, match) => {
    const chatId = msg.chat.id;
    const number = match[1].replace(/\D/g, '');

    if (sessionCount() >= config.maxSessions) {
        bot.sendMessage(chatId, '🚫 Maximum session limit reached. Please try again later.');
        return;
    }
    try {
        const code = await createPairing(number);
        bot.sendMessage(chatId, `✅ Pairing code for ${number}:\n\n${code}\n\nUse this code in your XMD app to complete the pairing process.`, { parse_mode: 'Markdown' });
    }
    catch (error) {
        bot.sendMessage(chatId, `❌ Failed to create pairing for ${number}. Please ensure the number is correct and try again.`);
    }

    });
