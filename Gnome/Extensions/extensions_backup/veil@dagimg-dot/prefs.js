
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

import { AboutPage } from "./prefs/AboutPage.js";
import { GeneralPage } from "./prefs/GeneralPage.js";
import { ItemsPage } from "./prefs/ItemsPage.js";

class VeilPrefs extends ExtensionPreferences {
  async fillPreferencesWindow(window) {
    const prefsWindow = window;

    prefsWindow._settings = this.getSettings();

    const generalPage = new GeneralPage();
    generalPage.bindSettings(prefsWindow._settings);
    prefsWindow.add(generalPage);

    const itemsPage = new ItemsPage();
    itemsPage.bindSettings(prefsWindow._settings);
    prefsWindow.add(itemsPage);

    const aboutPage = new AboutPage();
    aboutPage.setMetadata(this.metadata);
    prefsWindow.add(aboutPage);
  }
}

export {
  VeilPrefs as default
};
