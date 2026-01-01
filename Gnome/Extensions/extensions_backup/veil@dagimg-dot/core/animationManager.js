import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import { logger } from "../utils/logger.js";

class AnimationManager {
  settings;
  activeAnimations = /* @__PURE__ */ new Map();
  timeoutIds = /* @__PURE__ */ new Map();

  constructor(settings) {
    this.settings = settings;
  }

  fadeIn(actor) {
    this.cancelAnimation(actor);

    actor.visible = true;

    const duration = this.settings.get_int("animation-duration");
    const slideOffset = 30;

    actor.opacity = 0;
    actor.set_translation(slideOffset, 0, 0);

    const actorWithTransitions = actor;

    const translationTransition = new Clutter.PropertyTransition({
      property_name: "translation-x"
    });

    translationTransition.set_from(slideOffset);
    translationTransition.set_to(0);
    translationTransition.set_duration(duration);
    translationTransition.set_progress_mode(
      Clutter.AnimationMode.EASE_OUT_QUAD
    );

    const opacityTransition = new Clutter.PropertyTransition({
      property_name: "opacity"
    });

    opacityTransition.set_from(0);
    opacityTransition.set_to(255);
    opacityTransition.set_duration(duration);
    opacityTransition.set_progress_mode(Clutter.AnimationMode.EASE_OUT_QUAD);

    actorWithTransitions.add_transition("veil-slide-in", translationTransition);
    actorWithTransitions.add_transition("veil-fade-in", opacityTransition);

    this.activeAnimations.set(actor, Date.now());

    const handlerId = actorWithTransitions.connect(
      "transitions-completed",
      () => {
        actorWithTransitions.disconnect(handlerId);
        this.activeAnimations.delete(actor);
        logger.debug("Slide in completed");
      }
    );
  }

  fadeOut(actor) {
    return new Promise((resolve) => {
      this.cancelAnimation(actor);

      const duration = this.settings.get_int("animation-duration");
      const slideOffset = 30;

      const actorWithTransitions = actor;

      const translationTransition = new Clutter.PropertyTransition({
        property_name: "translation-x"
      });

      translationTransition.set_from(0);
      translationTransition.set_to(slideOffset);
      translationTransition.set_duration(duration);
      translationTransition.set_progress_mode(
        Clutter.AnimationMode.EASE_IN_QUAD
      );

      const opacityTransition = new Clutter.PropertyTransition({
        property_name: "opacity"
      });

      opacityTransition.set_from(actor.opacity);
      opacityTransition.set_to(0);
      opacityTransition.set_duration(duration);
      opacityTransition.set_progress_mode(Clutter.AnimationMode.EASE_IN_QUAD);

      actorWithTransitions.add_transition(
        "veil-slide-out",
        translationTransition
      );

      actorWithTransitions.add_transition("veil-fade-out", opacityTransition);

      this.activeAnimations.set(actor, Date.now());

      const handlerId = actorWithTransitions.connect(
        "transitions-completed",
        () => {
          actorWithTransitions.disconnect(handlerId);

          const timeoutId2 = this.timeoutIds.get(actor);
          if (timeoutId2 !== void 0) {
            GLib.Source.remove(timeoutId2);
            this.timeoutIds.delete(actor);
          }

          actor.visible = false;
          actor.opacity = 255;
          actor.set_translation(0, 0, 0);
          this.activeAnimations.delete(actor);
          logger.debug("Slide out completed, actor hidden");
          resolve();
        }
      );

      const existingTimeoutId = this.timeoutIds.get(actor);
      if (existingTimeoutId !== void 0) {
        GLib.Source.remove(existingTimeoutId);
      }

      const timeoutId = GLib.timeout_add(
        GLib.PRIORITY_DEFAULT,
        duration + 100,
        () => {
          if (this.activeAnimations.has(actor)) {
            logger.warn("Slide out timeout - forcing completion");
            actor.visible = false;
            actor.opacity = 255;
            actor.set_translation(0, 0, 0);
            this.activeAnimations.delete(actor);
            this.timeoutIds.delete(actor);
            resolve();
          }
          return GLib.SOURCE_REMOVE;
        }
      );

      this.timeoutIds.set(actor, timeoutId);
    });
  }

  cancelAnimation(actor) {
    if (this.activeAnimations.has(actor)) {
      const actorWithTransitions = actor;

      try {
        actorWithTransitions.remove_all_transitions?.();
      } catch {
        actorWithTransitions.remove_transition?.("veil-slide-in");
        actorWithTransitions.remove_transition?.("veil-slide-out");
        actorWithTransitions.remove_transition?.("veil-fade-in");
        actorWithTransitions.remove_transition?.("veil-fade-out");
      }

      const timeoutId = this.timeoutIds.get(actor);
      if (timeoutId !== void 0) {
        GLib.Source.remove(timeoutId);
        this.timeoutIds.delete(actor);
      }

      this.activeAnimations.delete(actor);
    }
  }

  destroy() {
    for (const actor of this.activeAnimations.keys()) {
      this.cancelAnimation(actor);
    }

    for (const timeoutId of this.timeoutIds.values()) {
      GLib.Source.remove(timeoutId);
    }

    this.activeAnimations.clear();
    this.timeoutIds.clear();

    logger.debug("AnimationManager destroyed");
  }
}

export {
  AnimationManager
};
