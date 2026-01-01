import Gio from "gi://Gio";

const ICONS = ["arrow-open", "arrow-close"];

class Icons {
  static #icons = /* @__PURE__ */ new Map();
  static #extPath = "";
  static #settings = null;

  constructor(extPath, settings) {
    Icons.#extPath = extPath;
    Icons.#settings = settings || null;

    this.loadIcons();

    if (Icons.#settings) {
      Icons.#settings.connect("changed::custom-open-icon", () => {
        this.loadIcon("arrow-open");
      });

      Icons.#settings.connect("changed::custom-close-icon", () => {
        this.loadIcon("arrow-close");
      });
    }
  }

  loadIcons() {
    for (const name of ICONS) {
      this.loadIcon(name);
    }
  }

  loadIcon(name) {
    let iconPath = null;

    if (Icons.#settings && (name === "arrow-open" || name === "arrow-close")) {
      const settingsKey = name === "arrow-open" ? "custom-open-icon" : "custom-close-icon";
      const customPath = Icons.#settings.get_string(settingsKey);

      if (customPath && customPath.length > 0) {
        const file = Gio.File.new_for_path(customPath);

        if (file.query_exists(null)) {
          iconPath = customPath;
        }
      }
    }

    if (!iconPath) {
      iconPath = `${Icons.#extPath}/assets/icons/${name}.svg`;
    }

    try {
      const icon = Gio.icon_new_for_string(iconPath);
      Icons.#icons.set(name, icon);
    } catch (e) {
      if (iconPath.includes("/assets/icons/")) {
        throw e;
      }
      const defaultPath = `${Icons.#extPath}/assets/icons/${name}.svg`;
      const icon = Gio.icon_new_for_string(defaultPath);
      Icons.#icons.set(name, icon);
    }
  }

  static get(name) {
    return Icons.#icons.get(name);
  }
}

export {
  Icons
};
