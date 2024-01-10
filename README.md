# Discordeno Bot Template

A bot template for discordeno.

Warning: This bot template hasn't fully been tested thoroughly.

## How to start

Run `pnpm start` for production or `pnpm dev` for development.

## Scripts

Each monorepo in the folder `app` has:

```bash
pnpm start
pnpm dev
```

Other useful commands:

```bash
pnpm lint # eslint
pnpm format # prettier

pnpm interactions/create # Create interaction commands

pnpm schema/push # Pushes the schema (no generation required. do not use this in production.)
pnpm schema/generate # Generates the schema
pnpm schema/migrate # Migrate the schema (use this to update the database in production)
```

## Events

When creating events, put them in the `src/bot/src/events` folder.

### Event boilerplate

```ts
import { createEvent } from "../utils/createFunctions";

export default createEvent("ready", () => {
  return (payload) => {
    console.log(`[Shard ${payload.shardId}] The shard is ready`);
  };
});
```

## Interactions

When creating interaction commands:

- For normal interaction commands, put them in the `src/bot/src/commands` folder.
- For subcommands, make a folder with the command name, then add subcommands in there.

### Non-persistent components

There's an entire function dedicated for handling non-persistent components.

- If you want a persistent message component, use the `components` folder instead of this. _(scroll upwards)_
- All custom IDs must start with `$` if you want them to be "non-persistent" components.
- Only components with a custom ID starting with `$` will become disabled when the interaction expires.
- You can use both `collector.end()` _(runs end event, aka disables components)_ and `collector.remove()` _(skips end event, aka doesn't disable components)_ to delete a non-persistent component.
- You can make a non-persistent component's `expiresIn` value as `Infinity`, and use `collector.end()` once you want to disable them.

```ts
import { MessageComponentTypes, ButtonStyles } from "@discordeno/bot";

// ...

await interaction.respond({
  content: "Hello world!",
  components: [
    {
      type: MessageComponentTypes.ActionRow,
      components: [
        {
          // Create button
          type: MessageComponentTypes.Button,
          style: ButtonStyles.Primary,
          label: "test",
          customId: "$test", // Component IDs have to start with "$" in order to be considered "non-persistent"
        },
      ],
    },
    {
      type: MessageComponentTypes.ActionRow,
      components: [
        {
          // Create select menu channel
          type: MessageComponentTypes.SelectMenuChannels,
          customId: "$components", // Component IDs have to start with "$" in order to be considered "non-persistent"
        },
      ],
    },
  ],
});

// Create message collector
const collector = await client.collectors.components.createOriginalInteraction(
  interaction,
  {
    // expiresIn is the amount of seconds the collector has until the message expires and disables components.
    expiresIn: 30,

    // events has the message collector events:
    events: {
      // When a component is executed, this function is ran:
      collect: (interaction) => {
        console.log("Clicked button with ID", interaction.data);
        interaction.respond("Disabling collector...");

        collector.end(); // Executes end event (which disables the components as well)
        // collector.remove(); // Skips end event (aka it wont disable components by default)
      },
      /*
          end: () => {
            // You need to put this on the top to use this function:
            // import { disableNonPersistentComponents } from "@/discordeno-helpers"

            // This is the default end event used to disable non-persistent components.
            disableNonPersistentComponents(
              client,
              collector.message,
            )
          },
        */
    },
  },
);
```

### Interaction boilerplates

Boilerplate for commands:

```ts
import { ApplicationCommand } from "../utils/createFunctions";
import { ApplicationCommandOptions as opts } from "@/discordeno-helpers";

export default new ApplicationCommand({
  data: {
    name: "commandName",
    description: "This is the command description.",
    options: {
      string: opts.string("test string value").autocomplete(),
      boolean: opts.boolean("test boolean value"),
      user: opts.user("test user value"),
      integer: opts.integer("test integer value"),
      number: opts.number("test number value"),
      channel: opts.channel("test channel value"),
      role: opts.role("test role value"),
      mentionable: opts.mentionable("test mentionable value"),
    },
  },
  async autocomplete({ client, interaction, options }) {
    console.log("Options", options);
    interaction.respond({
      choices: [
        {
          name: "test_name",
          value: "test_value",
        },
      ],
    });
  },
  async execute({ client, interaction, options }) {
    console.log("Options", options);
    await interaction.respond("Hello world!");
  },
});
```

Boilerplate for commands with subcommands:

```ts
import { ApplicationCommand } from "../utils/createFunctions";

import subcommandName from "./commandName/subcommandName";
import subcommandName2 from "./commandName/subcommandName2";

export default new ApplicationCommand({
  data: {
    name: "commandName",
    description: "This is the command description.",
    options: {
      // Add all your subcommands here.
      subcommandName,
      subcommandName2,
    },
  },
});
```

Boilerplate for subcommands:

```ts
import { ApplicationSubcommand } from "../../utils/createFunctions";
import { ApplicationCommandOptions as opts } from "@/discordeno-helpers";

export default new ApplicationSubcommand({
  data: {
    description: "This is a subcommand.",
    options: {
      integer: opts.integer("test integer value").required(),
    },
  },
  async autocomplete({ client, interaction, options }) {
    interaction.respond({
      choices: [
        {
          name: "test_name",
          value: "test_value",
        },
      ],
    });
  },
  execute({ client, interaction, options }) {
    console.log("Options", options);
    interaction.respond("Hello world");
  },
});
```

Boilerplate for components:

```ts
import { Component } from "../utils/createFunctions";

export default new Component({
  customId: "button", // In regex: /^button$/

  execute({ client, interaction }) {
    interaction.respond("Hello world!");
  },
});
```

## IPC handler from discord-cross-hosting

The IPC handler can be used to send messages across clusters with Typescript support.

IPC can be used as an alternative to `broadcastEval`.

In `packages/ipc`, there is a folder called `src/types` where you can declare:

- The message parameters in `IPCMessageRequests.ts` (for the website)
- The response in `IPCMessageResponses.ts` (for the bot).

These files are organized in this format:

```ts
{
  customEventName: {
    someCustomVariable: string;
  };
  anotherEventName: {
    yippee: number;
    moreVariables: string[];
  };
}
```

In order to handle requests and send responses, you have to add the IPC event in `apps/bot/src/ipc`.

Assuming `ipcMessageClient` is `getIPCMessageClient(<DiscordCrossHosting.Client>)`, this is how you send requests:

```js
const res = await ipcMessageClient.send(
  // Event name
  "customEventName",
  // The message parameters in the request
  {
    hello: "world",
  },
  // The guild ID is optional.
  // If provided, it will only send the message to the bot cluster handling the guild.
  { guildId },
);

// The response
console.log(res);
```

### IPC boilerplate

Boilerplate for IPC event handler in `apps/bot/src/ipc`:

```ts
import { createIPCMessageEvent } from "../utils/createFunctions";

export default createIPCMessageEvent("customEventName", (client) => {
  return async ({ guildId, data, reply }) => {
    console.log("Data from IPC:", guildId, data); // guildId is optional
    return reply({ foo: "bar" });
  };
});
```

## How to use database functions

Here's an example of how to run database functions:

```ts
import { db, table } from "@/db";

await db.insert(table).values({ tinyint: 123 });

console.log(await db.select().from(table));
```

### Never import `@/db` in the folder `apps`

All database functions should be written in `packages/utils`.
