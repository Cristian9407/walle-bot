let fs = require ('fs')
let path = require('path')
let handler  = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
    let exp = global.DATABASE.data.users[m.sender].exp
    let limit = global.DATABASE.data.users[m.sender].limit
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.DATABASE._data.users).length
    let tags = {
      'main': '𝑴𝒆𝒏𝒖',
      'xp': '𝑬𝒙𝒑 & 𝑳𝒊𝒎𝒊𝒕',
      'sticker': '𝑺𝒕𝒊𝒄𝒌𝒆𝒓',
      'kerang': '𝑱𝒖𝒆𝒈𝒐𝒔',
      'game': '𝑮𝒂𝒎𝒆',
      'images' : '𝑰𝒎𝒂𝒈𝒆𝒔',
      'data' : '𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏',
      'admin': '𝑨𝒅𝒎𝒊𝒏',
      'group': '𝑮𝒓𝒐𝒖𝒑',
      'internet': '𝑰𝒏𝒕𝒆𝒓𝒏𝒆𝒕',
      'downloader': '𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒆𝒓',
      'tools': '𝑻𝒐𝒐𝒍𝒔',
      'fun': '𝑭𝒖𝒏 𝒎𝒆𝒏𝒖',
      'jadibot': '𝑱𝒂𝒅𝒊 𝑩𝒐𝒕',
      'owner': '𝑶𝒘𝒏𝒆𝒓 𝒎𝒆𝒏𝒖',
      'host': '𝑯𝒐𝒔𝒕',
      'advanced': '𝑨𝒅𝒗𝒂𝒏𝒄𝒆𝒅',
      'info': '𝑰𝒏𝒇𝒐',
      '': '𝑵𝒐 𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒚',
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    function monospace(string) {
    let _3 = '`'.repeat(3)
    return _3 + string + _3
}
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || `
*╭═ ${conn.getName(conn.user.jid)}*
*├* 🙂 𝑯𝒊, %name!
*├* ✮ *%exp XP*
*├* ☡ 𝑳𝒊𝒎𝒊𝒕𝒆𝒔: *%limit Limit*
*│*
*├* 📆 𝑭𝒆𝒄𝒉𝒂: *%week %weton, %date*
*├* ⌚ 𝑯𝒐𝒓𝒂: *%time*
*│*
*├* 🕐 𝑻𝒊𝒆𝒎𝒑𝒐 𝒅𝒆 𝒂𝒄𝒕𝒊𝒗𝒊𝒅𝒂𝒅: *%uptime*
*├* 💻 𝑨𝒄𝒕𝒊𝒗𝒊𝒅𝒂𝒅 𝒑𝒓𝒊𝒏𝒄𝒊𝒑𝒂𝒍: *%muptime*
*├* 📁 𝑫𝒂𝒕𝒂𝒃𝒂𝒔𝒆: %totalreg numeros
*╰─────────────────═*
%readmore
*╭═* 𝑹𝒆𝒈𝒍𝒂𝒔
*├* 🚫 𝑃𝑟𝑜𝒉𝑖𝑏𝑖𝑑𝑜 𝑙𝑙𝑎𝑚𝑎𝑟 𝑎𝑙 𝑏𝑜𝑡 📲
*├* 🚫 𝑃𝑟𝑜𝒉𝑖𝑏𝑖𝑑𝑜 𝑠𝑝𝑎𝑚 𝑎𝑙 𝑏𝑜𝑡 ☢
*├* 🚫 𝑁𝑜 𝑎𝑔𝑟𝑒𝑔𝑎𝑟 𝑎𝑙 𝑏𝑜𝑡 𝑎 𝑔𝑟𝑢𝑝𝑜𝑠 ♻
*╰─────────────────═*
%readmore`
    let header = conn.menu.header || '*╭═* ⭕ %category'
    let body   = conn.menu.body   || '*├* %cmd%islimit'
    let footer = conn.menu.footer || '*╰─────────────────═*\n'
    let after  = conn.menu.after  || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + `\n*Powered-by*@CristianC593\n\`\`\`\wa.me/593960175832\`\`\``
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      exp, limit, name, weton, week, date, time, totalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.reply(m.chat, texto.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Lo sentimos, el menú tiene un error', m)
    throw e
  }
}
handler.help = ['menu','help','?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
