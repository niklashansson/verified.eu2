import type { CMSItem } from 'src/types/CMSitem';

import { getPropValue } from './getPropValue';
/**
 * Sort an array of elements by date
 * @param array Array to sort
 * @param CMSItem
 * @param order Order of the sort (asc or desc)
 */

export const sortCMSListArrayByDate = (array: Array<CMSItem>, order: 'asc' | 'desc' = 'desc') => {
  array.sort((a, b) => {
    const dateAStr: string | undefined = getPropValue(a, 'publish date');
    const dateBStr: string | undefined = getPropValue(b, 'publish date');

    if (dateAStr === undefined || dateBStr === undefined) return 0;

    const dateA = new Date(dateAStr);
    const dateB = new Date(dateBStr);

    if (order === 'asc') {
      return dateA.getTime() - dateB.getTime();
    }

    return dateB.getTime() - dateA.getTime();
  });

  return array;
};
