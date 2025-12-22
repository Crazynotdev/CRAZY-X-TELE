import { handlers } from 'handlers.js';
import { logger } from '../core/logger.js';

export function bindEvents(crazy) {
    crazy.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'open') {
            logger.info(`🟢 [${crazy.user.name}] Connected successfully.`);
        }
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            logger.warn(`🔴 [${crazy.user.name}] Disconnected. Reason: ${reason}`);
        }
        })
        crazy.ev.on('messages.upsert', async (m) => {
            const message = m.messages[0];
            if (!message.message || message.key.fromMe) return;
            await handlers.messageHandler(crazy, m);
        });
    crazy.ev.on('group-participants.update', async (gp) => {
        await handlers.groupParticipantsHandler(crazy, gp);
    });
}
