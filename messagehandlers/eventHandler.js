var jam = ['lebronJAM aye', 'TriKool aye', 'TriKool🔥', '🔥THIS SOME🔥lebronJAM🔥ABSOLUTE FIRE🔥', 'lebronJAM 🔥', '🔥TriDance🔥', 'TriDance 🔥', 'TriDance', 'TriDance aye', 'TriKool'];

const handle = (msg, client) => {
    if (msg.senderUsername === 'daumenbot') return;
    if (msg.messageText.includes("daumenbot") && msg.messageText.includes("TriHard")) {
        client.say(msg.channelName, `@${msg.senderUsername} TriHard`)
    }
    if (msg.messageText == '!daumenbot' || msg.messageText == '+about' || msg.messageText == '+help') {
        client.say(msg.channelName, `This bot nams the weebs xd. Contact @daumenloser or @yagnesh`)
    }
    if (msg.channelName === 'forsen') return;
    if (msg.messageText === 'TriHard') {
        client.say(msg.channelName, `TriHard`)
    }
    if (msg.messageText.includes('lebronJAM')) {
        const jammsg = jam[Math.floor(Math.random() * jam.length)];
        client.say(msg.channelName, jammsg);
    }
    if (msg.messageText.includes('$gn')) {
        if (msg.channelName === 'eiectricevil')
            client.say(msg.channelName, '$tuck ' + msg.senderUsername + ' Hope you have a good night Foreheadkiss ❤')
    }
    if (isAlertEvent(msg)) {
        client.me(msg.channelName, `pajaSubs 🚨 ALERT`);
    }

}

function isAlertEvent(msg) {
    return msg.isAction &&
        msg.senderUsername == 'pajbot' &&
        msg.messageText.includes('pajaS 🚨 ALERT');
}

exports.handle = handle
