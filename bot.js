const tmi = require('tmi.js');
const cooldown = require('cooldown');
const fs = require('fs');
let f = fs.readFileSync('./db/channels.txt').toString();
let names = f.split(" ");
names[1] = "ii_dee";
names[2] = "ninr"

const channelsFile = './db/channels.txt';
const blackList = './db/blacklist.txt';
const channelOptions = fs.readFileSync(channelsFile).toString().split('"').filter(
    function(i){return i != null;}).join('').split(' ')


const cd = new cooldown(2000);
const pyramidcd = new cooldown(15000);
const weebcd = new cooldown(5000);

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
let weebC = 0;

loop(); loop1();

client.on(`chat`, (channel, tags, message, self)=>{
    if(self) return;
    if(weebDetected(message)) weebC++;
    if((message.includes("daumenbot")&&weebDetected(message)&&weebcd.fire())||(weebC%10===0&&weebcd.fire())){
        if(i%2===0)client.say(channel,`${tags.username}, NaM stfu`);
        else if(i%5===0) client.say(channel,`${tags.username}, NaM 🇻🇳 ⣰⠛⣦⠛⣿⠛⢸⠛⠛⣿⠀⣿⠀⠸⡇⣸⡄⡿⢸⠛⠛⣿⠛⠃⣿⠛⡆⣴⠛⣦⠀ ⠘⠷⣄⠀⣿⠀⢸⠶⠆⣿⠀⣿⠀⠀⣇⡇⣇⡇⢸⠶⠆⣿⠶⠆⣿⠾⡅⠙⠶⣄⠀ ⠻⣤⠟⠀⠿⠀⠸⠀⠀⠹⣤⠟⠀⠀⠹⠃⠻⠀⠸⠤⠤⠿⠤⠄⠿⠤⠇⠻⣤⠟ `)
        else client.say(channel,`${tags.username}, NaM stfu weeb`);
        i++;
        weebC++;
    }
    else return;
});

client.on(`chat`, (channel, tags, message, self) => {
    if (self) return;
    if (message == `widepeepoHappy`&&cd.fire()) {
        if(i%2==0)client.say(channel, `widepeepoHappy`)
        else client.say(channel, `widepeepoHappy` + " " + "⠀")
        i++;
    }
    if (message == `TriDance`&&cd.fire()) {
        if(i%2==0)client.say(channel, `TriDance`)
        else client.say(channel, `TriDance⠀`)
        i++;
    }
    if(message === 'cringe'&&cd.fire()) {
        if(i%2==0)client.say(channel, `${tags.username} LUL BWAHAHAHAHHAHAHAHAHHAHAHA`)
        else client.say(channel, `${tags.username} LUL BWAHAHAHAHHAHAHAHAHHAHAHA⠀`)
        i++;
    }
    if(message.includes('PogU')&&cd.fire()) {
        if(i%2==0)client.say(channel, `${tags.username}, PagChomp Clap`)
        else client.say(channel, `${tags.username}, PagChomp Clap` + " " + "⠀")
        i++;
    }
    if(message === 'play roblox'&&cd.fire()) {
        if(i%2==0)client.say(names[2], `FeelsWeirdManW 🤚 ${tags.username}`)
        else client.say(names[2], `FeelsWeirdManW 🤚 ${tags.username}⠀`)
        i++;
    }
    if(message === 'TriHard'&&cd.fire()) {
        if(i%2==0)client.say(channel, `TriHard`)
        else client.say(channel, `TriHard 7`)
        i++;
    }
})

client.on('chat', (channel, user, message, self) => {
    if(self) return;
    if(user['user-id'] === "151035078"){
        if(message.includes('bro')) {
            fs.appendFileSync('./db/bro.txt', user.name+' bro');
        }
    }
});

/*client.on(`chat`, async (channel, user, message, self) => {
    if(self) return;
    if(user['user-id'] != '150819483'&&user['user-id'] != '124776535') {
        if(message.startsWith('!join'))
            console.log(user, message);
        if(message.includes('lac')&&cd.fire()) {
            client.say(names[1], `FeelsWeirdMan`)
        if(message.startsWith('*help')&&cd.fire()) {
            client.say(channel, "My commands are 'widepeepoHappy', 'TriHard', 'TriAlien', 'PogU', 'cringe'")
            }
        }
    }
}); */


//commands
client.on(`chat`, async (channel, user, message, self) => {   
    if(self) return;
    if(isCommand(message)&&cd.fire()) {
        let tmp = message.split(" ");
        if(tmp[0].slice(1,tmp[0].length)==="join"&&isAdmin(user)){
            fs.appendFileSync(channelsFile, " "+tmp[1]);  
            client.say(channel,"added " +tmp[1]+" to channel, restarting");
            fs.writeFileSync(channelsFile,fs.readFileSync(channelsFile).toString());
            cd.fire();
            process.exit(1);
        }
        if(tmp[0].slice(1,tmp[0].length)==="part"&&isAdmin(user)){
            let name = tmp[1];
            let s = fs.readFileSync(channelsFile).toString();
            s = s.split(" ");
            for(let k=0;k<s.length;k++){
                if(s[k]===name){
                    s.splice(k);
                }
            }
            fs.writeFileSync(channelsFile,s.toString());
            client.say(channel,"removed "+name+" from channellist");
            cd.fire();
            process.exit(1);
        }
        if (message === '!restart') {
            if(user['user-id'] != '150819483'&&user['user-id'] != '124776535') return;
            client.say(channel, 'restarting').then(() => {
            process.exit(1);
            })
        }
        if(tmp[0].slice(1,tmp[0].length)==="pyramid"&&(client.userstate[channel].mod||client.userstate[channel].badges.vip==='1')&&isAdmin(user)){
            //if(weebDetected(message)) client.say(channel,"NaM stfu");
            if(message.includes('WebPepeSmash')){
                let emote = 'peepoWeebSmash'
                let n = tmp[2];
                let max = 5; let min = 3;
                if(n<=max&&n>=min){
                    for(let k=0;k<=n;k++){
                        client.say(channel, stackEmote(k,emote));
                    }
                    for(let k=n-1;k>0;k--){
                        client.say(channel,stackEmote(k,emote));
                    }
                }
            }
            else {
                let emote = tmp[1];
                let n = tmp[2];
                let max = 5; let min = 3;
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
        if(tmp[0].slice(1,tmp[0].length)==="pyramid"&&(!client.userstate[channel].mod)){
            
        }
        if(tmp[0].slice(1,tmp[0].length)==="test"){
            client.say(channel,"test");
            console.log(client.userstate[channel].badges.vip==='1');
        }
        if(tmp[0].slice(1,tmp[0].length)==="addToBlackList"){
            fs.appendFileSync(blackList, " "+tmp[1]);  
            client.say(channel,"added " +tmp[1]+" to blacklist, restarting");
            fs.writeFileSync(blackList,fs.readFileSync(blackList).toString());
            cd.fire();
            process.exit(1);
        }
        if(tmp[0].slice(1,tmp[0].length)==="removeFromBlackList"){
            let name = tmp[1];
            let s = fs.readFileSync(blackList).toString();
            s = s.split(" ");
            for(let k=0;k<s.length;k++){
                if(s[k]===name){
                    s.splice(k);
                }
            }
            fs.writeFileSync(blackList,s.toString());
            client.say(channel,"removed "+name+" from blacklist");
            cd.fire();
            process.exit(1);
        }
        if(tmp[0].slice(1,tmp[0].length)==="channels"){
            let s = fs.readFileSync(channelsFile).toString();
            client.say(channel,s);
        }
        if(tmp[0].slice(1,tmp[0].length)==="trihard"&&pyramidcd.fire()){
            console.log("trihard");
            client.say(channel, `⣿⣿⣿⣿⣿⠿⠿⠟⠟⠉⠉⠉⠉⠛⠛⠉⠻⠿⠻⠿⢿⣿⣿⣿⣿⡇ ⣿⣿⣿⡿⠇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠹⢿⣿⣿⡇ ⣿⣿⠏⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠹⣿⡇ ⠟⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⡇ ⣷⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣀⣀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠇ ⡏⠄⠄⠄⠄⠄⠄⠄⠄⢠⣾⣿⣿⣿⣿⣿⣷⣶⣦⣀⠄⠄⠄⠄⠄⠃ ⣇⣀⠄⠄⠄⠄⠄⠄⠄⣺⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄⠄⠄⠄⠄⡀ ⣿⣿⣤⣤⡄⠄⠄⣠⣬⣼⣯⣟⣿⣿⣿⣿⣿⣿⣿⣧⠄⠄⠄⢀⣾⡇ ⣿⣿⣿⣿⠃⠄⠄⣿⣯⣔⣆⣠⣍⣿⣿⣿⡿⣛⡉⡐⠄⣀⣤⣾⣿⡇ ⣿⣿⣿⣿⠄⠄⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⢤⣿⣀⣁⡄⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⠄⠄⠈⠿⣿⣿⣿⣿⣿⣿⣿⣿⣄⣿⣿⣿⣆⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣇⠄⠄⡀⢋⢩⣙⣛⣿⣿⡟⠉⠋⠛⠛⢋⣽⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣿⣆⠄⠄⢼⣧⣿⣿⣿⣿⣿⡥⡠⢒⣴⣿⣿⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣿⣿⣧⠄⢹⣿⣿⣿⣿⣿⣿⠅⢡⣿⣿⣿⣿⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣿⣿⣿⣧⡈⣿⣿⣯⣭⣭⣡⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣉⣉⣛⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇`);
        }
        if (tmp[0].slice(1, tmp[0].length) === "say"&&isAdmin(user)) {
            console.log("trihard");
            client.say(channel, message.slice(4));
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

function weebDetected(m) {
    let s = fs.readFileSync(blackList).toString();
    s = s.split(" ");

    for(let i=0;i<s.length;i++){
        if(m.includes(s[i])&&s[i]!='') return true;
    }

    return false;
}

function isAdmin(user){
    return (user['user-id'] === '150819483'||user['user-id'] === '124776535'||user['user-id'] === '198160641'||user['user-id']==='44159749' );
}

function loop(){ 
    let s = fs.readFileSync(channelsFile).toString();
    s = s.split(" ");

    for(let i=0;i<s.length;i++){
        client.say(s[i],"⣿⣿⣿⣿⣿⣿⠿⠛⣉⣍⠁⠄⠈⠉⠉⠉⠉⠉⠉⡩⣍⡻⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⡿⢃⣴⡿⠛⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⢷⣝⣞⢿⣿⣿⣿⣿ ⣿⣿⣿⠟⣰⣿⠟⠁⠄⠄⠄⠄⠄⠄⢀⣀⣤⠄⠄⠄⠄⠙⢯⣻⣿⣿⣿⣿ ⣿⣿⣿⣸⣿⠏⠄⠄⠄⠄⠄⢀⣤⣴⣿⣿⣿⣷⡄⠄⠄⠄⠄⣧⠛⣿⣿⣿ ⣿⣿⡇⣿⣯⠄⠄⠄⠄⠄⠄⢸⣿⣿⣿⣿⣿⣿⣷⠦⠄⠄⠄⠉⠂⢹⣿⣿ ⣿⣿⡇⡿⠃⠄⠄⠄⠄⠄⠄⣉⣛⣿⣿⣿⣿⣿⣶⣶⣤⣴⠄⠄⠄⠘⢿⣿ ⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠋⡉⠻⣿⣿⣿⣿⢫⡉⠄⢹⣿⡀⠐⠂⢁⣾⣿ ⣿⣿⡀⠄⠄⠄⠄⠄⠈⠄⣀⣥⣦⡾⠄⣿⣿⣶⣿⣿⣿⣿⡇⠄⠄⠸⣿⣿ ⣿⣿⣇⠄⠄⠄⠄⠄⠄⢼⣿⣿⣿⠏⠄⣽⣿⣿⣿⣿⣿⣿⡇⠄⡀⠄⣿⣿ ⣿⣿⣿⣷⡀⠄⠄⠄⢀⠘⢿⣿⣿⠄⠂⠛⣛⣿⣿⣿⣿⣿⣇⣾⣿⠄⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣦⠸⣿⣼⡏⠁⠄⠘⢻⡛⢓⡛⣿⣿⡿⣼⣿⣿⢀⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣇⠘⠏⠃⠄⣤⣴⣶⣶⣿⣿⣿⢻⣾⣿⣿⣧⣾⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠈⠻⣿⣿⣽⣿⠋⣰⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣈⠙⢉⣰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿ ")
    }
    try{
        setTimeout(()=>{ loop()}, 1800000)
    }catch(err){
        console.log(err);
    }
}

function loop1(){
    let s = fs.readFileSync(channelsFile).toString();
    s = s.split(" ");

    for(let i=0;i<s.length;i++){
        client.say(s[i],"NaM");
    }

    setTimeout(() => {loop1()}, 300000);
}


