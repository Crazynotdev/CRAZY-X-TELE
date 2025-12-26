import { createSocket } from './sock.js';

export async function createPairing(number) {
    // createSocket is async so we must await it
    const crazydev = await createSocket(number);

    // Protect against missing authState shape
    const registered = crazydev?.authState?.creds?.registered;

    if (!registered) {
        if (typeof crazydev.requestPairingCode !== 'function') {
            throw new Error('Socket does not support requestPairingCode.');
        }
        const code = await crazydev.requestPairingCode(number);
        return code;
    }

    throw new Error('Number is already registered.');
}
