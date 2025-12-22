import { createSocket } from './sock.js';

export async function createPairing(number) {
    const crazydev = createSocket(number);
    if (!crazydev.authState.creds.registered) {
        const code = await crazydev.requestPairingCode(number);
        return code;
    }
    throw new Error('Number is already registered.');
}