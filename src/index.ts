import discord, { Channel, Message, Permissions, TextChannel } from "discord.js";
const cron = require('cron');
require('dotenv').config();
const TOKEN = process.env.TOKEN;


const TheLustyArgonianMaid = "Acto IV, escena III, continuación\n" +
							 "Subesu Faldón: \n" +
							"¡Claro que no, señor! Estoy aquí para limpiar sus aposentos.\n" +
							"Funebrio Armo: \n" +
							"¿Es la única razón por la que has venido aquí, pequeña? ¿La limpieza de mis aposentos?\n" +
							"Subesu Faldón: \n" +
							"No sé a qué se refiere, señor. Tan solo soy una pobre criada argoniana.\n" +
							"Funebrio Armo: \n" +
							"Eso es lo que eres, cariño. Y se te da bien, por cierto. Qué piernas tan fuertes tienes, y qué bien te sienta ese faldón.\n" +
							"Subesu Faldón: \n" +
							"¡Señor, me está avergonzando!\n" +
							"Funebrio Armo: \n" +
							"No temas, conmigo estás a salvo.\n" +
							"Subesu Faldón: \n" +
							"Tengo que terminar de limpiar, señor. ¡La señora pedirá mi cabeza si no lo hago!\n" +
							"Funebrio Armo: \n" +
							"Debes limpiar, ¿eh? Tengo un trabajito para ti. Ven, límpiame la lanza.\n" +
							"Subesu Faldón: \n" +
							"¡Pero es enorme! ¡Podría llevarme toda la noche!\n" +
							"Funebrio Armo: \n" +
							"Tenemos mucho tiempo, cariño. Mucho tiempo.\n" +
							"FIN DEL IV ACTO, ESCENA III";


// create a function to encapsulate the bot's functionality
export default async function  bot() {

	//const cmds = ["mpies"," id"," test","mpies con clorox"," help","mpies mi lanza"];

	const cmds: Map<string, (msg:discord.Message) => string> = new Map();
	cmds.set("mpies", (msg: discord.Message) => {
		if (msg.guild!.me?.permissions.has("MANAGE_MESSAGES") && msg.channel != undefined && msg.channel != null) clean(msg.channel as TextChannel);
		else return "I don't have the permission to delete messages";
		return "";
	});
	cmds.set(" id", (msg: discord.Message) => msg.channel.id);
	cmds.set(" test", (msg: discord.Message) => "test");
	cmds.set("mpies con clorox", (msg: discord.Message) => {
		if (msg.guild!.me?.permissions.has("MANAGE_MESSAGES")) deepClean(msg.channel as TextChannel);
		else return "I don't have the permission to delete messages";
		return "";
	});
	cmds.set(" help", (msg: discord.Message) => {
		let help = "\nOrdendes:\n";
		cmds.forEach(cmd => {
			help += "\t" + prefix + cmd + "\n";
		});
		return help;
	});
	cmds.set("mpies mi lanza", (msg: discord.Message) => TheLustyArgonianMaid);
		
	const prefix = "!kelly";

	const client = new discord.Client();

	async function  clean(channel: TextChannel) {
		let fetched: discord.Collection<string, discord.Message>;
		do {
			fetched = await channel.messages.fetch({limit: 100});
			try {
				channel.bulkDelete(fetched, true);
			} catch(error) {
				console.log("❗ Error deleting messages: " + error);
			}
		}
		while(fetched.size >= 2);
		console.log("Cleaned " + channel.name);
	}

	async function  deepClean(channel: TextChannel) {
		let fetched: discord.Collection<string, discord.Message>;
		do {
			fetched = await channel.messages.fetch({limit: 100});
			fetched.forEach(async message => {
				if (message.deletable) {
					try {
						await message.delete();
					}
					catch(error) {
						if (error != "DiscordAPIError: Unknown Message" ) console.log("❗ Error deleting messages: "  + error);
					}
				}
		});
		}
		while(fetched.size >= 2);
		console.log("Cleaned " + channel.name);
	}


	const channels = [];

	client.on('ready', () => {
		if (client && client.user) {	
			console.log(`Logged in as ${client.user.tag}!`);
		} else {
			console.log("Error logging in");
			process.exit(1);
		}	
	
	});

	client.on('message', (msg) => {
		if (msg.author.id == client!.user!.id) return;
		console.log("new message" + msg.content);
			if (msg.content.startsWith(prefix)){
				console.log("with prefix");
			let command = msg.content.replace(prefix,"");
			if (cmds.has(command)) {
				try {
					let result: string = cmds.get(command)!(msg);
					if (result != "") msg.reply(result);
				} catch(error) {
					console.log("y hace BUUM 💣 ya esta aqui la guerra");
					msg.reply("y hace BUUM 💣 ya esta aqui la guerra");
				}
			} else {
				msg.reply("Yamete kudasai!")
			}


			}
		});


	client.login(TOKEN);
}

bot();