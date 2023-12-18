import { camelize } from "@discordeno/bot";
import { ComponentCollectors } from "./ComponentCollectors.js";
import { disableNonPersistentComponents } from "../utils/disableNonPersistentComponents.js";

export class ComponentCollector {
  /**
   * @param {ComponentCollectors} collectors
   * @param {import("../../types/ComponentCollector.js").ComponentCollectorMessage} message
   * @param {import("../../types/ComponentCollector.js").ComponentCollectorOptions} opts
   */
  constructor(collectors, message, opts) {
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

    if (this.expiresIn !== Infinity) {
      this.timeout = setTimeout(() => {
        this.end();
      }, this.opts.expiresIn * 1000);
    }
  }
  /** @param {import("@discordeno/bot").MessageComponents | undefined} components */
  setComponents(components) {
    return (this.message.components = camelize(components));
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
