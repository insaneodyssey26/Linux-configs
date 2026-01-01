import Clutter from "gi://Clutter";
import St from "gi://St";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import * as PopupMenu from "resource:///org/gnome/shell/ui/popupMenu.js";
import { Icons } from "../lib/icons.js";
import { MainPanel } from "../types/index.js";
import { logger } from "../utils/logger.js";

class VeilIndicator {
  indicator;
  extension;
  iconWidget = null;
  onToggleCallback;
  onHoverEnterCallback;
  onHoverLeaveCallback;
  settings;
  isHovering = false;

  constructor(extension, settings) {
    this.extension = extension;
    this.settings = settings;
    this.indicator = new PanelMenu.Button(0, "Veil");
    this.setupUI();
    this.setupMenu();
    this.setupClickHandler();
    this.setupHoverHandlers();
  }

  setupUI() {
    new Icons(this.extension.path, this.settings);
    this.updateIcon(true);
  }

  setupClickHandler() {
    this.indicator.connect("button-press-event", (_actor, event) => {
      const button = event.get_button();

      if (button === Clutter.BUTTON_PRIMARY) {
        const interactionMode = this.settings.get_string("interaction-mode");

        if (interactionMode === "click") {
          logger.debug("Primary click on Veil indicator");
          this.onToggleCallback?.();

          if (this.indicator.menu) {
            this.indicator.menu.close();
          }
        } else {
          logger.debug("Click ignored in Hover mode");
        }
      }
    });

    this.indicator.connect("touch-event", (_actor, event) => {
      const eventType = event.type();

      if (eventType === Clutter.EventType.TOUCH_BEGIN) {
        const interactionMode = this.settings.get_string("interaction-mode");

        if (interactionMode === "click") {
          logger.debug("Touch begin on Veil indicator");
          this.onToggleCallback?.();

          if (this.indicator.menu) {
            this.indicator.menu.close();
          }
        } else {
          logger.debug("Touch ignored in Hover mode");
        }
      }
    });
  }

  setupMenu() {
    const settingsItem = new PopupMenu.PopupMenuItem("Settings");
    settingsItem.connect("activate", () => {
      logger.debug("Opening Veil preferences");
      this.extension.openPreferences();
    });

    if (this.indicator.menu && "addMenuItem" in this.indicator.menu) {
      this.indicator.menu.addMenuItem(settingsItem);
    }
  }

  updateIcon(isVisible) {
    if (this.iconWidget) {
      this.indicator.remove_child(this.iconWidget);
      this.iconWidget = null;
    }

    const iconName = isVisible ? "arrow-close" : "arrow-open";
    const veilIcon = Icons.get(iconName);

    if (veilIcon) {
      this.iconWidget = new St.Icon({
        gicon: veilIcon,
        style_class: "system-status-icon"
      });

      this.indicator.add_child(this.iconWidget);
      logger.debug("Icon updated", { iconName, isVisible });
    }
  }

  getIndicatorPosition() {
    const rightBoxItems = MainPanel._rightBox.get_children();

    for (let index = 0; index < rightBoxItems.length; index++) {
      const item = rightBoxItems[index];

      if (item.firstChild === Main.panel.statusArea.quickSettings) {
        return index;
      }
    }

    return rightBoxItems.length;
  }

  repositionIndicator() {
    const indicatorButton = this.indicator;
    const container = indicatorButton.get_parent();

    if (!container) return;

    const rightBoxItems = MainPanel._rightBox.get_children();

    let quickSettingsIndex = -1;

    for (let index = 0; index < rightBoxItems.length; index++) {
      const item = rightBoxItems[index];

      if (item.firstChild === Main.panel.statusArea.quickSettings) {
        quickSettingsIndex = index;
        break;
      }
    }

    if (quickSettingsIndex === -1) {
      logger.warn("Could not find Quick Settings for repositioning");
      return;
    }

    MainPanel._rightBox.set_child_at_index(
      container,
      Math.max(0, quickSettingsIndex - 1)
    );

    logger.debug("Indicator repositioned", { position: quickSettingsIndex });
  }

  setupHoverHandlers() {
    this.indicator.connect("enter-event", () => {
      const interactionMode = this.settings.get_string("interaction-mode");

      if (interactionMode === "hover") {
        logger.debug("Hover enter on Veil indicator");
        this.isHovering = true;
        this.updateIcon(true);
        this.onHoverEnterCallback?.();
      }
      return Clutter.EVENT_PROPAGATE;
    });

    this.indicator.connect("leave-event", () => {
      const interactionMode = this.settings.get_string("interaction-mode");

      if (interactionMode === "hover") {
        logger.debug("Hover leave on Veil indicator");
        this.isHovering = false;
        this.onHoverLeaveCallback?.();
      }
      return Clutter.EVENT_PROPAGATE;
    });
  }

  setOnToggle(callback) {
    this.onToggleCallback = callback;
  }

  setOnHoverEnter(callback) {
    this.onHoverEnterCallback = callback;
  }

  setOnHoverLeave(callback) {
    this.onHoverLeaveCallback = callback;
  }

  restoreIconAfterHover() {
    if (!this.isHovering) {
      this.updateIcon(false);
      logger.debug("Icon restored to hidden state after hover");
    }
  }

  getButton() {
    return this.indicator;
  }

  destroy() {
    if (this.indicator) {
      this.indicator.destroy();
    }
  }
}

export {
  VeilIndicator
};
