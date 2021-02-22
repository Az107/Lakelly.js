const discord = require("discord.js");
const Status = require("./Status");
const cron = require('cron');

const TOKEN = process.env.TOKEN;


const status = new Status.Status();

const client = new discord.Client();
const channels = [
  /*'811748032361136149'recibidor,*/
  '811746850829893633'/*salon*/,
  '811751631673622578'/*picacodigo*/];
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    status.Start();
    console.log("Servers:")
  
});

let scheduledMessage = new cron.CronJob('00 00 01 * * *', () => {
  // This runs every day at 1am

  channels.forEach(id => {
    let channel = client.channels.cache.get(id);
    channel.messages.fetch({ limit: 100 }).then(messages => {
      //Iterate through the messages here with the variable "messages".
      messages.forEach(message => message.delete())
    });

  })
});

let callstatus = new cron.CronJob('00 20 * * * *', () => {
  // This runs every hour at '20
  http.get('url');
});

// When you want to start it, use:
scheduledMessage.start()
callstatus.start();
// You could also make a command to pause and resume the job

client.login(TOKEN);