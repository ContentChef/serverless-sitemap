import { IXMLSitemapItem } from '@app/XML';
import { ISearchResponse } from '@contentchef/contentchef-node';

export function formatDate(date: string) {
  return date.split('T')[0];
}

export function getDate(item: ISearchResponse) {
  if (typeof item.metadata.contentLastModifiedDate === 'string') {
    return item.metadata.contentLastModifiedDate;
  }

  return item.metadata.publishedOn;
}

export function getURL(item: ISearchResponse): string {
  return item.publicId;
}

export function isUrl(input: string): boolean {
  return input.indexOf('/') === 0;
}

export function map(item: ISearchResponse): IXMLSitemapItem {
  const date = formatDate(getDate(item));
  const url = getURL(item);

  return { date, url };
}

export default {
  formatDate,
  getDate,
  isUrl,
  map,
}