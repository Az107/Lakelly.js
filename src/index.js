const discord = require("discord.js");
const cron = require('cron');

const TOKEN = process.env.TOKEN;


const cmds = ["mpies"," id"," test"];
const prefix = "!kelly";


function clean(id) {
	let channel = client.channels.cache.get(id);
    channel.messages.fetch({ limit: 100 }).then(messages => {
      //Iterate through the messages here with the variable "messages".
      messages.forEach(message => message.delete())
		}
  );
}

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

client.on('message', (msg) => {
    console.log("new message");
		if (msg.content.startsWith(prefix)) console.log("with prefix");
		let command = msg.content.replace(prefix,"");
		let i = cmds.indexOf(command);
		switch (i) {
			case 0:
				clean(msg.channelId);
				break;
			case 1:
				msg.reply(msg.channelId);
				break;
			case 2:
				msg.reply("All right");
				break;
			default:
				msg.reply("Yamete kudasai!");

		}
  
});

let scheduledMessage = new cron.CronJob('00 00 01 * * *', () => {
  // This runs every day at 1am

  channels.forEach(id => {
    clean(id);
  })
});

// When you want to start it, use:
scheduledMessage.start()

// You could also make a command to pause and resume the job

client.login(TOKEN);