"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // node_modules/.pnpm/@finsweet+ts-utils@0.39.2/node_modules/@finsweet/ts-utils/dist/type-guards/instances.js
  var isHTMLInputElement = (target) => target instanceof HTMLInputElement;

  // node_modules/.pnpm/@finsweet+ts-utils@0.39.2/node_modules/@finsweet/ts-utils/dist/helpers/simulateEvent.js
  var simulateEvent = (target, events) => {
    if (!Array.isArray(events))
      events = [events];
    const eventsSuccess = events.map((event) => target.dispatchEvent(new Event(event, { bubbles: true })));
    return eventsSuccess.every((success) => success);
  };

  // node_modules/.pnpm/@finsweet+ts-utils@0.39.2/node_modules/@finsweet/ts-utils/dist/helpers/setFormFieldValue.js
  var setFormFieldValue = (element, value) => {
    const { type } = element;
    const isRadio = type === "radio";
    const isCheckbox = type === "checkbox";
    if (isRadio || isCheckbox) {
      if (!isHTMLInputElement(element) || typeof value !== "boolean" || value === element.checked || isRadio && value === false) {
        return;
      }
      element.checked = value;
    } else {
      if (element.value === value)
        return;
      element.value = value.toString();
    }
    simulateEvent(element, ["click", "input", "change"]);
  };

  // src/utils/getLocaleFromPath.ts
  var getLocale = function() {
    const path = window.location.pathname.slice(1, 3);
    let locale = { country: "International", isoCode: "en" };
    if (path === "no")
      locale = { country: "Norway", isoCode: "no" };
    if (path === "sv")
      locale = { country: "Sweden", isoCode: "sv" };
    if (path === "fi")
      locale = { country: "Finland", isoCode: "fi" };
    return locale;
  };

  // src/forms.ts
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const { country } = getLocale();
    const localeFormFieldInputs = document.querySelectorAll(
      '[data-default-input-value="locale"]'
    );
    localeFormFieldInputs.forEach((input) => {
      setFormFieldValue(input, country);
    });
  });
})();
//# sourceMappingURL=forms.js.map
