import type { Bot } from "@discordeno/bot";
import type { ComponentCollectors } from "../structures";

export type ExtendedBot<B extends Bot = Bot> = B & {
  collectors: {
    components: ComponentCollectors<B>;
  };
};
