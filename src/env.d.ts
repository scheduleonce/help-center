import type { StarlightRouteData } from "@astrojs/starlight/dist/utils/routing/types.js";
import type { I18nT } from "@astrojs/starlight/dist/utils/createTranslationSystem.js";

declare global {
  namespace App {
    interface Locals {
      t: I18nT;
      starlightRoute: StarlightRouteData;
    }
  }
}
