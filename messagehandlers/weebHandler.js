let weebC = 0;

const handle = (msg, client) => {
    if (msg.messageText.includes("daumenbot") || weebC % 15 === 0) {
        if (msg.senderUserID === '275711366' || msg.senderUserID === '150819483' || msg.senderUserID === '455288756') return;
        let rand = Math.floor(Math.random() * 3)
        if (rand == 0) client.say(msg.channelName, `${msg.senderUsername}, NaM stfu`);
        if (rand == 1) client.say(msg.channelName, `${msg.senderUsername}, NaM 🇻🇳 ⣰⠛⣦⠛⣿⠛⢸⠛⠛⣿⠀⣿⠀⠸⡇⣸⡄⡿⢸⠛⠛⣿⠛⠃⣿⠛⡆⣴⠛⣦⠀ ⠘⠷⣄⠀⣿⠀⢸⠶⠆⣿⠀⣿⠀⠀⣇⡇⣇⡇⢸⠶⠆⣿⠶⠆⣿⠾⡅⠙⠶⣄⠀ ⠻⣤⠟⠀⠿⠀⠸⠀⠀⠹⣤⠟⠀⠀⠹⠃⠻⠀⠸⠤⠤⠿⠤⠄⠿⠤⠇⠻⣤⠟ `)
        if (rand == 2) client.say(msg.channelName, `${msg.senderUsername}, NaM stfu weeb`);
    }
    weebC++;
}

exports.handle = handle