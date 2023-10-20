import { setFormFieldValue } from '@finsweet/ts-utils';

import { getLocale } from '$utils/getLocaleFromPath';

window.Webflow = window.Webflow || [];
window.Webflow.push(async () => {
  // get the locale from the URL
  const { country } = getLocale();

  // select all form fields with data-default-input-value="locale" attribute
  const localeFormFieldInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    '[data-default-input-value="locale"]'
  );

  // set the default value of each form field to the locale
  localeFormFieldInputs.forEach((input) => {
    setFormFieldValue(input, country);
  });
});
