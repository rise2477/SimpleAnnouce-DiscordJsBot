const { REST, Routes } = require("discord.js");

module.exports = {
  async execute(client) {
    const { TOKEN, GUILD_ID, BOT_ID } = client.config;
    const rest = new REST({ version: "10" }).setToken(TOKEN);

    const commandArray = new Array();
    const commands = client.commands;

    commands.forEach((cmd) => {
      commandArray.push(cmd.data);
    });
    // to guild
    await rest.put(Routes.applicationCommands(BOT_ID), {
      body: commandArray,
    });
  },
};
