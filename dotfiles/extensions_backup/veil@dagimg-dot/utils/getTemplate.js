import GLib from "gi://GLib";
import { logger } from "./logger.js";

const getTemplate = (name) => {
  let uri = null;

  const uriReference = `../ui/${name}.ui`;

  try {
    uri = GLib.uri_resolve_relative(
      import.meta.url,
      uriReference,
      GLib.UriFlags.NONE
    );

    if (uri === null) {
      throw new Error(`Failed to resolve URI for template ${name}!`);
    }
  } catch (error) {
    logger.error(`Failed to resolve URI for template ${name}!`, error);
    throw error;
  }

  return uri;
};

export {
  getTemplate
};
