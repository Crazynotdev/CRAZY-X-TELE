const sessions = new Map();

export function addSession(number, crazy) {
    sessions.set(number, { crazy });
}

export function getSession(number) {
    return sessions.get(number);
}

export function deleteSession(number) {
    sessions.delete(number);
}

export function sessionCount() {
    return sessions.size;
}
//@Crazynotdev