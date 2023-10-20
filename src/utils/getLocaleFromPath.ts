/**
 * Get the locale from the URL
 * @returns {object} locale
 */

type Locale = {
  country: string;
  isoCode: string;
};

export const getLocale = function () {
  const path = window.location.pathname.slice(1, 3);
  let locale: Locale = { country: 'International', isoCode: 'en' };

  if (path === 'no') locale = { country: 'Norway', isoCode: 'no' };
  if (path === 'sv') locale = { country: 'Sweden', isoCode: 'sv' };
  if (path === 'fi') locale = { country: 'Finland', isoCode: 'fi' };

  return locale;
};
