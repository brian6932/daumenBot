const logger = require('./logger')
const CronJob = require('cron').CronJob;

let client;
let db;
const startNamJob = (c, database) => {
    client = c
    db = database

    const job = new CronJob('00 00 00 * * *', function () {
        logger.log("GFM VIETNAM");
        if (process.env.NODE_ENV !== 'production') {
            db.get('debugchannels').then(channels => {
                for (let i = 0; i <= channels.length; i++) {
                    client.me(channels[i], "GOOD FUCKING MORNING VIETNAM NaM 🇻🇳 ");
                }
            })
        }
        else {
            db.get('channels').then(channels => {
                for (let i = 0; i <= channels.length; i++) {
                    client.me(channels[i], "GOOD FUCKING MORNING VIETNAM NaM 🇻🇳 ");
                }
            })
        }
    }, null, true, 'Asia/Pontianak');
    job.start();
    logger.log("started gfmvn job")
}

exports.startNamJob = startNamJob