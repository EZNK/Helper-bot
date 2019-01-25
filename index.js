

const botconfig = require("./botconfig.json");
const { Client, Attachment } = require('discord.js');
const client = new Client();
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let prefix = botconfig.prefix;
let owner = botconfig.owner;
let token = botconfig.token;






bot.on("message", async message => {

  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);



  if(message == `c!flip`) {
      message.channel.send(`Выпал(а): **${Math.floor(Math.random() * 2) == 0 ? "орёл" : "решка"}**!`);
    }

});




console.log(`Я Работаю`)


bot.login(token);


bot.on('message',function(message){
    console.log(`${message.author.id} ||| ${message.author.username} ====>>> ${message.content}` )
});



bot.on('message',(message) => {
    if(message.content  == "c!owner") {
      let bicon ;
      let helpembed = new Discord.RichEmbed()
      .setDescription("owner")
      .setColor("#33CCFF")
      .setThumbnail(bicon)
      .addField(`⇓⇓⇓⇓⇓`,`<@${owner}>`, true);

  
  
      message.channel.send(helpembed)
      .then(updated => console.log(`Use owner's command `));
    }
  });



  fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Команды не найдены");
      return;
    }

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`Команда ${f} Загружена`);
      bot.commands.set(props.help.name, props);
    });
  });


 

