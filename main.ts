import { App, Checkboxes, KnownBlock } from "@slack/bolt";
const config = require("./config.json");

const CHANNEL_ID = config["channel_id"];
const BOT_TOKEN = config["bot_token"];
const APP_TOKEN = config["app_token"];

const app = new App({
  token: BOT_TOKEN,
  appToken: APP_TOKEN,
  socketMode: true,
});

const toMessage = (list: string[]): KnownBlock[] => {
  const options: Checkboxes = {
    type: "checkboxes",
    options: list.map((text) => ({
      text: { type: "mrkdwn", text: text },
      value: text,
    })),
    action_id: "checkbox",
  };
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: " ",
      },
      accessory: options,
    },
  ];
};

const run = async () => {
  // const bot_id = (await app.client.auth.test()).bot_id;
  await app.start();
  app.command("/kaimono", async ({ command, ack, say }) => {
    await ack();
    const list = command.text.split("\n").filter((v) => v.length > 0);
    const message = toMessage(list);
    await say({ text: "", blocks: message });
  });
  app.action("checkbox", async ({ action, ack, body }) => {
    await ack();
    // TODO: 上手いこと管理する方法を考える
  });
};

run();
