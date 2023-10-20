import type { CMSItem } from 'src/types/CMSitem';

/**
 * Get the prop value from Finsweet CMSItem.
 * @param {CMSItem} item - The CMSItem instance.
 * @param {string} propName - The prop name.
 * @returns {string} The prop value.
 */

export function getPropValue(item: CMSItem, propName: string) {
  const propData = item.props[propName];

  // check if propData exists and has values
  if (propData && propData.values.size) {
    return Array.from(propData.values)[0];
  }

  return undefined;
}
