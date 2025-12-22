import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys';
import logger from '../core/logger.js';
import { addSession } from '../core/sessions.js';
import { bindEvents } from '../core/events.js';

export async function createSocket(number) {
    const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${number}`);
    const { version } = await fetchLatestBaileysVersion();

    const crazy = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        browser: ['Crazy Bot', 'Safari', '1.0.0'],
    });
    crazy.ev.on('creds.update', saveCreds);
    bindEvents(crazy, number);
    addSession(number, crazy);

    return crazy;
}