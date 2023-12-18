# Discordeno Bot Template

A bot template for discordeno.

Warning: This bot template hasn't fully been tested thoroughly.

## How to start

Make sure to go to each monorepo and run `pnpm start` for production or `pnpm dev` for development.

Make sure to run `apps/bridge` first, because it's the "bridge" between all apps.

## Commands

Each monorepo in the folder `app` has:

```bash
pnpm start
pnpm dev
```

Other useful commands:

```bash
pnpm lint # eslint
pnpm format # prettier
```

## Create interaction commands

You can create your interaction commands using

```bash
cd apps/bot
pnpm interactions/create
```

## Database

All the database functions are handled in `packages/db`.

```bash
cd packages/db
```

These are the following database scripts you can run:

```bash
pnpm schema/push # Pushes the schema (no generation required. do not use this in production.)

pnpm schema/generate # Generates the schema
pnpm schema/migrate # Migrate the schema (use this to update the database in production)
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

Only run database functions in packages in the folder `packages`.

## Notes and tips

### Components

- Use the `components` folder if you want a persistent message component.
- All custom IDs must start with `$` if you want them to expire.
- Only components with a custom ID starting with `$` will become disabled when the interaction expires.
