import { getDateValue, getTextContent } from 'notion-utils';
import type {
  BlockMap,
  CollectionPropertySchemaMap,
  Decoration,
  PropertyType,
} from 'notion-types';
import type { PageProperties } from './types';

/**
 * Return page properties of a specific page id.
 */
export function getPageProperties(
  pageId: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap
) {
  const rawProperties: [string, Decoration[]][] = Object.entries(
    block[pageId].value.properties || []
  );
  const excludePropertyTypes: PropertyType[] = [
    'date',
    'select',
    'multi_select',
  ];

  const properties: PageProperties = {
    id: pageId,
    createdTime: new Date(block[pageId].value.created_time).toString(),
  };

  rawProperties.forEach(([key, value]) => {
    const propertyType = schema[key].type;
    const propertyName = schema[key].name;

    if (!excludePropertyTypes.includes(propertyType)) {
      properties[propertyName] = getTextContent(value);
      return;
    }

    switch (propertyType) {
      case 'date': {
        const dateProperty = getDateValue(value);
        if (dateProperty) properties.date = dateProperty;

        break;
      }
      case 'select': {
        const select = getTextContent(value);
        if (propertyName === 'type' || propertyName === 'status') {
          if (select.length) properties[propertyName] = select;
        }
        break;
      }
      case 'multi_select': {
        const selects = getTextContent(value);
        if (selects.length) properties.tags = selects.split(',');

        break;
      }
      default:
        break;
    }
  });

  return properties;
}
