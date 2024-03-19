const { PermissionsBitField } = require("discord.js");
const { AUTHOR_PROFILE } = require('./../../Configs/config');
const { AUTHOR_NAME } = require('./../../Configs/config');
const { TOPIC_CONTENT } = require('./../../Configs/config');

module.exports = {
  data: {
    name: "announce",
    description: "Make an announcement in the server",
    options: [
      {
        name: "title",
        description: "The title message",
        type: 3,
        required: true,
      },
      {
        name: "subtitle",
        description: "The announcement message",
        type: 3,
        required: true,
      },
      {
        name: "content",
        description: "The content message",
        type: 3,
        required: true,
      },
      {
        name: "thumnailurl",
        description: "Set thumbnail url",
        type: 3,
        required: false,
      },
      {
        name: 'imageurl',
        description: "Set under url",
        type: 3,
        required: false,
      },
    ],
  },
  async execute(interaction, client) {
    if (!interaction.guild) {
      return interaction.reply("This command can only be used in a server.");
    }
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
    {
      return await interaction.reply({
        embeds: [
          {
            title: `❌ You can't Use This Command!`,
            color: 0xFF3333,
          },
        ],
        ephemeral: true,
      });
    }

//############### Inside Config##################
//If you dont know how it work dont change this!
const subtitle = interaction.options.getString("subtitle");
const content = interaction.options.getString("content");
const thum = interaction.options.getString("thumnailurl");
const under_image = interaction.options.getString("imageurl");
const title = interaction.options.getString("title");

    // check when annoucement message is empty
    if (!subtitle) {
      return await interaction.reply({
        embeds: [
          {
            title: `❌ Please provide a valid announcement message!`,
            color: 0xFF3333,
          },
        ],
        ephemeral: true,
      });
    }

    try {
      // embed reply
      await interaction.reply({
        embeds: [
          {
            title: "📢 " + title,
            description: subtitle ,
            color: 0x00ffaa,
            author: {
              name: (AUTHOR_NAME),
              icon_url: (AUTHOR_PROFILE),
            },
            fields: [
              {
                name: (TOPIC_CONTENT),
                value: content,
              },
            ],
            thumbnail: {
              url: thum
            },
            image: {
              url: under_image
            },
            timestamp: new Date().toISOString(),
            footer: {
              text: (AUTHOR_NAME),
              icon_url: (AUTHOR_PROFILE),
            },
          },
        ],
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      return await interaction.reply({
        embeds: [
          {
            title: `❌ Error while making announcement`,
            description: "Please maybe try to check url is Image Url or Not",
            color: 0xFF3333,
          },
        ],
        ephemeral: true,
      });
    }
  },
};
