import { closeDropdown } from '@finsweet/ts-utils';

/**
 * @description - Set the return links on submenus to close dropdown
 * @param returnLinks - The return links from the dropdown submenus
 * @returns - nothing
 */

export function setNavDropdownsReturnLink(returnLinks: NodeListOf<HTMLButtonElement>) {
  returnLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const dropdown = <HTMLDivElement>link.closest('.w-dropdown');
      if (!dropdown) return;
      e.preventDefault();
      closeDropdown(dropdown);
    });
  });
}
