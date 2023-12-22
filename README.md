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

When creating events:

- Put them in the `src/bot/src/events` folder.
- Make sure to add it to the array in `apps/bot/src/config/events.ts`.

### Boilerplate

```ts
import type { EventHandlers } from "@discordeno/bot";

export default () => ({
  execute: (...args: Parameters<EventHandlers["EVENT_NAME_HERE"]>) => {
    console.log(args);
  },
});
```

## Interactions

When creating interaction commands:

- For normal interaction commands, put them in the `src/bot/src/commands` folder.
- For subcommands, make a folder with the command name, then add subcommands in there.

After creating interactions:

- For interaction commands, make sure to add it to the array in `apps/bot/src/config/commands.ts`.
- For persistent components, make sure to add it to the array in `apps/bot/src/config/components.ts`.

### Non-persistent components

There's an entire function dedicated for handling non-persistent components.

- If you want a persistent message component, use the `components` folder instead of this. _(scroll upwards)_
- All custom IDs must start with `$` if you want them to be "non-persistent" components.
- Only components with a custom ID starting with `$` will become disabled when the interaction expires.
- You can use both `collector.end()` _(runs end event, aka disables components)_ and `collector.remove()` _(skips end event, aka doesn't disable components)_ to delete a non-persistent component.
- You can make a non-persistent component's `expiresIn` value as `Infinity`, and use `collector.end()` once you want to disable them.

```js
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

### Boilerplates

Boilerplate for commands:

```js
import {
  ApplicationCommand,
  ApplicationCommandOptions as opts,
} from "@/discordeno-helpers";

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

```js
import { ApplicationCommand } from "@/discordeno-helpers";

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

```js
import {
  ApplicationSubcommand,
  ApplicationCommandOptions as opts,
} from "@/discordeno-helpers";

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

```js
export default {
  customId: "button", // In regex: /^button$/

  execute({ client, interaction }) {
    interaction.respond("Hello world!");
  },
};
```

## How to use database functions

Make sure to add this in dependencies to use the database functions:

```json
"dependencies": {
  "@/db": "workspace:*",
  ...
}
```

Here's an example of how to run database functions:

```js
import { db, table } from "@/db";

await db.insert(table).values({ tinyint: 123 });

console.log(await db.select().from(table));
```

### Never import `@/db` in the folder `apps`

All database functions should be written in `packages/db/src/functions`.
