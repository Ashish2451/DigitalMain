const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/mybot', async ({ command, ack, say }) => {
  await ack();

  switch (command.text) {
    case 'hello':
      say('Hello there!');
      break;
    case 'help':
      say('Available commands:\n- /mybot hello\n- /mybot help\n- /mybot time');
      break;
    case 'time':
      const currentTime = new Date().toLocaleString();
      say(`Current date and time: ${currentTime}`);
      break;
    default:
      say("I'm sorry, I don't understand that command. Use /mybot help for available commands.");
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bot is running!');
})();
