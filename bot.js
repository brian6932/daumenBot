const tmi = require('tmi.js');
const cooldown = require('cooldown');

const fs = require('fs');
const channelsFile = './db/channels.txt';
const channelOptions = fs.readFileSync(channelsFile).toString().split('"').filter(
    function(i){return i != null;}).join('').split(' ')


const cd = new cooldown(2000);
const pyramidcd = new cooldown(15000)

const prefix = "!";

cd.on('ready', console.log.bind('console', 'off cooldown'));

const config = {
    options: {
        debug: false,
    },
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: `daumenbot`,
        password: `oauth:ql53i0xwhxdoalefhwr8tacdw0jntc`
    },
    channels: channelOptions
};

const client = new tmi.client(config)
client.connect();

let i=0;
client.on(`chat`, (channel, user, message, self) => {
    if (self) return;
    if (message == `widepeepoHappy`&&cd.fire()) {
        if(i%2==0)client.say(channel, `widepeepoHappy`)
        else client.say(channel, `widepeepoHappy` + " " + "⠀")
        i++;
    }
})

client.on('chat', (channel, tags, message, self, user, username) => {
    if(self) return;
    if(tags.username=="xzn1"&&cd.fire()){
        if(i%2==0)client.say(channel,`${tags.username} stfu WeirdChamp`);
        else client.say(channel,`${tags.username} stfu WeirdChamp` + " " + "⠀");
    }
});

client.on(`chat`, (channel, user, message, self) => {
    if (self) return;
    if (message == `TriAlien`&&cd.fire()) {
        if(i%2==0)client.say(channel, `TriAlien`)
        else client.say(channel, `TriAlien⠀`)
        i++;
    }
})

client.on(`chat`, (channel, tags, message, self) => {
    if(self) return;
    if(message === 'PogU'&&cd.fire()) {
    if(i%2==0)client.say(channel, `${tags.username}, PagChomp Clap`)
        else client.say(channel, `${tags.username}, PagChomp Clap` + " " + "⠀")
        i++;
    }
});

client.on(`chat`, (channel, tags, message, self) => {
    if(self) return;
    if(message === 'cringe'&&cd.fire()) {
    if(i%2==0)client.say(channel, `${tags.username} LUL BWAHAHAHAHHAHAHAHAHHAHAHA`)
        else client.say(channel, `${tags.username} LUL BWAHAHAHAHHAHAHAHAHHAHAHA⠀`)
        i++;
    }
});

client.on('chat', (channel, user, message, self) => {
    if(self) return;
    if(user['user-id'] === "151035078"){
        if(message.includes('bro')) {
            fs.appendFileSync('./db/bro.txt', ' bro');
        }
    }
});

client.on(`chat`, (channel, tags, message, self) => {
    if(self) return;
    if(message === 'play roblox'&&cd.fire()) {
    if(i%2==0)client.say(channel, `FeelsWeirdManW 🤚 ${tags.username}`)
        else client.say(channel, `FeelsWeirdManW 🤚 ${tags.username}⠀`)
        i++;
    }
});

client.on(`chat`, (channel, tags, message, self) => {
    if(self) return;
    if(message === 'TriHard') {
        if(i%2==0)client.say(channel, `TriHard`)
        else client.say(channel, `TriHard 7`)
    }
});

client.on(`chat`, async (channel, user, message, self) => {
    if(self) return;
    if(user['user-id'] != '150819483'&&user['user-id'] != '124776535') {
        if(message.startsWith('!join'))
        console.log(user, message);
    }
    else {
    if(isCommand(message)&&cd.fire()) {
        let tmp = message.split(" ");
        if(tmp[0].slice(1,tmp[0].length)==="join"){
            fs.appendFileSync(channelsFile, ' "' + tmp[1]+ '"'); 
            client.say(channel,"added " +tmp[1]+" to channels");
            client.say(channel,"/follow "+tmp[1]);
        }
        }
        if(tmp[0].slice(1,tmp[0].length)==="part"){
            let name = tmp[1];
            let s = fs.readFileSync(channelsFile).toString();
            s = s.split(" ");
            for(let k=0;k<s.length;k++){
                if(s[k]===name){
                    s.splice(k);
                }
            }
            fs.writeFileSync(channelsFile,s.toString());
        }
        }
    });

client.on(`chat`, async (channel, tags, message, self) => {   
    if(self) return;
    if(isCommand(message)&&pyramidcd.fire()) {
    let tmp = message.split(" ");
    if(tmp[0].slice(1,tmp[0].length)==="pyramid"&&(client.userstate[channel].badges.vip==="1"||client.userstate[channel].mod)){
        if(message.Includes('AYAYA')) {
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('hoSway')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('KonCha')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('PunOko')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('TearGlove')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('TehePelo')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('TPcrunchyroll')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('TPFufun')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('shimizuPeace')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('tsukkiLaugh')){
            client.say(channel, '🔫 NaM - weeb emote detected')
        }
        else if(message.Includes('WebPepeSmash')){
        let emote2 = 'peepoWeebSmash'
        let n = tmp[2];
        let max = 10; let min = 5;
        if(n<=max&&n>=min){
            for(let k=0;k<=n;k++){
                client.say(channel, stackEmote(k,emote2));
            }
            for(let k=n-1;k>0;k--){
                client.say(channel,stackEmote(k,emote2));
                }
            }
        }
        let emote = tmp[1];
        let n = tmp[2];
        let max = 20; let min = 5;
        if(n<=max&&n>=min){
            for(let k=0;k<=n;k++){
                client.say(channel, stackEmote(k,emote));
            }
            for(let k=n-1;k>0;k--){
                client.say(channel,stackEmote(k,emote));
                }
            }
        }
    }
});

function isCommand(m){
    if(m.charAt(0)==='!') return true;
    else return false;
}

function stackEmote(n,emote){
    let s = "";
    for(let i=0;i<n;i++){
        s = s.concat(" "+emote);
    }
    return s;
}

