import { info } from "./logger";
import type { NrzIgnoreOptions } from "./types";

export function getTask(args: NrzIgnoreOptions): string {
  if (args.task) {
    info(`Using "${args.task}" as the task from the arguments`);
    return `"${args.task}"`;
  }

  info('Using "build" as the task as it was unspecified');

  return "build";
}
