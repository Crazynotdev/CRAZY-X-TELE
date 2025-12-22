import config from "./config.js"

export async function handleMessage(sock, msg) {
  const from = msg.key.remoteJid
  const body =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    ""

  if (!body.startsWith(config.prefix)) return

  const [command, ...args] = body
    .slice(1)
    .trim()
    .split(/\s+/)

  switch (command) {

    case "menu":
      return sock.sendMessage(from, {
        text: `🤖 *CRAZY XMD*
        
.menu
.ping
.info
.owner`
      })

    case "ping":
      return sock.sendMessage(from, { text: "🏓 CRAZY XMD ONLINE" })

    case "info":
      return sock.sendMessage(from, {
        text: `⚙️ Bot : CRAZY XMD\n⚡ Engine : Baileys\n📦 Mode : Stable`
      })

    case "owner":
      return sock.sendMessage(from, { text: "👑 CRAZY DEV" })
  }
}
