import { camelize, MessageComponents, type Bot } from "@discordeno/bot";
import { disableNonPersistentComponents } from "../utils/disableNonPersistentComponents";

import type { ComponentCollectors } from "./ComponentCollectors";
import type {
  ComponentCollectorMessage,
  ComponentCollectorOptions,
} from "../types";

export class ComponentCollector<B extends Bot> {
  deleted: boolean;
  collectors: ComponentCollectors<B>;
  message: ComponentCollectorMessage;
  opts: ComponentCollectorOptions;
  timeout?: NodeJS.Timeout;

  /**
   * Create a component collector
   * @param collectors The initialized ComponentCollectors object
   * @param message The message
   * @param opts The options
   */
  constructor(
    collectors: ComponentCollectors<B>,
    message: ComponentCollectorMessage,
    opts: ComponentCollectorOptions,
  ) {
    this.deleted = false;
    this.collectors = collectors;
    this.message = {
      id: message?.id,
      channelId: message?.channelId,
      components: message?.components,
    };
    this.opts = {
      expiresIn: opts?.expiresIn || 30, // in seconds
      events: {
        collect: opts?.events?.collect,
        end:
          opts?.events?.end ||
          (() =>
            disableNonPersistentComponents(
              this.collectors.client,
              this.message,
            )),
      },
    };

    if (this.opts?.expiresIn !== Infinity) {
      this.timeout = setTimeout(
        () => {
          this.end();
        },
        (this.opts.expiresIn || 30) * 1000,
      );
    }
  }
  /**
   * Change the message components in the message object
   * @param components The message components
   * @returns The message components
   */
  setComponents(components?: MessageComponents) {
    return (this.message.components = camelize(components || []));
  }
  /**
   * Removes the collector without running the end event.
   */
  end() {
    if (!this.remove()) return;

    if (typeof this.opts.events?.end === "function") {
      this.opts.events?.end();
    }
  }
  /**
   * Ends the collector and running the end event.
   */
  remove() {
    if (this.deleted) return false;

    this.collectors.remove(this.message.id);
    if (this.timeout) clearTimeout(this.timeout);

    return (this.deleted = true);
  }
}
