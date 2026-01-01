import GLib from "gi://GLib";
import { MainPanel } from "../types/index.js";
import { logger } from "../utils/logger.js";
import { AnimationManager } from "./animationManager.js";

class PanelManager {
  settings;
  veilIndicator;
  animationManager;
  addedHandlerId = null;
  removedHandlerId = null;
  onItemsChangedCallback;
  stateManager;
  initialSetupComplete = false;
  hoverHideTimerId = null;
  onHoverCompleteCallback;

  constructor(settings, veilIndicator, stateManager) {
    this.settings = settings;
    this.veilIndicator = veilIndicator;
    this.stateManager = stateManager;
    this.animationManager = new AnimationManager(settings);
    this.setupListeners();
    this.updateAllItemsList();
  }

  setupListeners() {
    this.addedHandlerId = MainPanel._rightBox.connect(
      "child-added",
      this._onItemAdded.bind(this)
    );

    this.removedHandlerId = MainPanel._rightBox.connect(
      "child-removed",
      this._onItemRemoved.bind(this)
    );

    logger.debug("Panel listeners setup complete");
  }

  _onItemAdded(_container, actor) {
    logger.debug("Panel item added", { actor });

    if (this.initialSetupComplete) {
      const child = actor.firstChild;

      if (child) {
        const itemName = this.getItemName(child);
        if (itemName && child !== MainPanel.statusArea.quickSettings && child !== this.veilIndicator) {
          this.handleNewItemVisibility(itemName, actor);
        }
      }
    }

    this.updateAllItemsList();
    this.onItemsChangedCallback?.(this.getAllItemNames());
  }

  _onItemRemoved(_container, actor) {
    logger.debug("Panel item removed", { actor });
    this.updateAllItemsList();
    this.onItemsChangedCallback?.(this.getAllItemNames());
  }

  updateAllItemsList() {
    const itemNames = this.getAllItemNames();
    this.settings.set_strv("all-items", itemNames);
    logger.debug("Updated all-items list", { count: itemNames.length });
  }

  getAllItemNames() {
    const rightBoxItems = MainPanel._rightBox.get_children();
    const itemNames = [];

    rightBoxItems.forEach(
      (item) => {
        const child = item.firstChild;
        if (!child) return;

        if (child === MainPanel.statusArea.quickSettings || child === this.veilIndicator) {
          return;
        }

        const name = this.getItemName(child);

        if (name) {
          itemNames.push(name);
        }
      }
    );

    return itemNames;
  }

  getAllPanelItems() {
    const rightBoxItems = MainPanel._rightBox.get_children();
    const items = [];

    rightBoxItems.forEach(
      (item) => {
        const child = item.firstChild;
        if (!child) return;

        if (child === MainPanel.statusArea.quickSettings || child === this.veilIndicator) {
          return;
        }

        const name = this.getItemName(child);

        if (name) {
          items.push({
            name,
            actor: child,
            container: item
          });
        }
      }
    );

    return items;
  }

  getItemName(item) {
    if (item.accessible_name && item.accessible_name !== "") {
      return item.accessible_name;
    }

    if (item.constructor && "name" in item.constructor) {
      return item.constructor.name;
    }

    return null;
  }

  isItemVisible(item) {
    const visibleItems = this.settings.get_strv("visible-items");
    return visibleItems.includes(item.name);
  }

  setVisibility(visible) {
    this.initialSetupComplete = true;

    const panelItems = this.getAllPanelItems();
    const visibleItems = this.settings.get_strv("visible-items");
    const animationEnabled = this.settings.get_boolean("animation-enabled");

    if (visible) {
      if (animationEnabled) {
        panelItems.forEach((item) => {
          this.animationManager.fadeIn(item.container);
        });
      } else {
        panelItems.forEach((item) => {
          item.container.visible = true;
          item.container.opacity = 255;
        });
      }
    } else {
      if (animationEnabled) {
        const allFadeOutPromises = [];

        panelItems.forEach((item) => {
          allFadeOutPromises.push(
            this.animationManager.fadeOut(item.container)
          );
        });

        Promise.all(allFadeOutPromises).then(() => {
          const itemsToShow = panelItems.filter(
            (item) => visibleItems.includes(item.name)
          );

          itemsToShow.forEach((item) => {
            this.animationManager.fadeIn(item.container);
          });
        });
      } else {
        panelItems.forEach((item) => {
          const shouldBeVisible = visibleItems.includes(item.name);
          item.container.visible = shouldBeVisible;
          item.container.opacity = 255;
        });
      }
    }

    logger.debug("Set panel visibility", {
      visible,
      totalItems: panelItems.length,
      visibleItemsCount: visibleItems.length,
      animated: animationEnabled
    });
  }

  restoreVisibility() {
    const panelItems = this.getAllPanelItems();
    const visibleItems = this.settings.get_strv("visible-items");

    panelItems.forEach((item) => {
      const shouldBeVisible = visibleItems.includes(item.name);
      item.container.visible = shouldBeVisible;
    });

    logger.debug("Restored panel visibility", {
      totalItems: panelItems.length,
      visibleItemsCount: visibleItems.length
    });
  }

  showAllItems() {
    const panelItems = this.getAllPanelItems();
    panelItems.forEach((item) => {
      item.container.visible = true;
    });
    logger.debug("Showed all panel items", { count: panelItems.length });
  }

  setOnItemsChanged(callback) {
    this.onItemsChangedCallback = callback;
  }

  setOnHoverComplete(callback) {
    this.onHoverCompleteCallback = callback;
  }

  temporarilyShowItems() {
    this.cancelHoverHideTimer();

    const panelItems = this.getAllPanelItems();
    const animationEnabled = this.settings.get_boolean("animation-enabled");

    if (animationEnabled) {
      const itemsToAnimate = panelItems.filter(
        (item) => !item.container.visible
      );

      itemsToAnimate.forEach((item) => {
        this.animationManager.fadeIn(item.container);
      });

      const itemsToFix = panelItems.filter(
        (item) => item.container.visible && item.container.opacity < 255
      );

      itemsToFix.forEach((item) => {
        item.container.opacity = 255;
      });
    } else {
      panelItems.forEach((item) => {
        item.container.visible = true;
        item.container.opacity = 255;
        item.container.set_translation(0, 0, 0);
      });
    }

    logger.debug("Temporarily showing all items (hover)", {
      count: panelItems.length,
      animated: animationEnabled
    });
  }

  temporarilyHideItemsWithDelay() {
    const hideOnLeave = this.settings.get_boolean("hover-hide-on-leave");

    if (hideOnLeave) {
      this.restoreVisibilityToSavedState();
      this.onHoverCompleteCallback?.();
      logger.debug("Hide on leave: items hidden immediately");
    } else {
      this.cancelHoverHideTimer();

      const hoverDuration = this.settings.get_int("hover-duration");

      this.hoverHideTimerId = GLib.timeout_add_seconds(
        GLib.PRIORITY_DEFAULT,
        hoverDuration,
        () => {
          this.hoverHideTimerId = null;
          this.restoreVisibilityToSavedState();
          this.onHoverCompleteCallback?.();
          return GLib.SOURCE_REMOVE;
        }
      );

      logger.debug("Scheduled hover hide", { duration: hoverDuration });
    }
  }

  cancelHoverHideTimer() {
    if (this.hoverHideTimerId !== null) {
      GLib.Source.remove(this.hoverHideTimerId);
      this.hoverHideTimerId = null;
      logger.debug("Cancelled hover hide timer");
    }
  }

  restoreVisibilityToSavedState() {
    const currentVisibility = this.stateManager.getVisibility();
    this.setVisibility(currentVisibility);
    logger.debug("Restored visibility to saved state", {
      visible: currentVisibility
    });
  }

  handleNewItemVisibility(itemName, container) {
    const currentVisibility = this.stateManager.getVisibility();
    const visibleItems = this.settings.get_strv("visible-items");

    if (currentVisibility) {
      container.visible = true;
      container.opacity = 255;
      logger.debug("New item shown (visibility=true)", { itemName });
    } else {
      const shouldBeVisible = visibleItems.includes(itemName);
      container.visible = shouldBeVisible;
      container.opacity = 255;
      logger.debug("New item visibility set based on visible-items", {
        itemName,
        visible: shouldBeVisible
      });
    }
  }

  destroy() {
    this.cancelHoverHideTimer();
    this.animationManager.destroy();

    if (this.addedHandlerId !== null) {
      MainPanel._rightBox.disconnect(this.addedHandlerId);
      this.addedHandlerId = null;
    }

    if (this.removedHandlerId !== null) {
      MainPanel._rightBox.disconnect(this.removedHandlerId);
      this.removedHandlerId = null;
    }

    logger.debug("PanelManager destroyed");
  }
}

export {
  PanelManager
};
